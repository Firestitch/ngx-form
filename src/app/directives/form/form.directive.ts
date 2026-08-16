import { AfterContentInit, Directive, EventEmitter, HostBinding, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';

import { guid } from '@firestitch/common';
import { MessageMode } from '@firestitch/message';
import { FsMessage } from '@firestitch/message';

import {
  BehaviorSubject,
  combineLatest,
  concat,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';
import {
  catchError,
  delay,
  filter,
  first,
  map,
  mergeMap,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  toArray,
} from 'rxjs/operators';

import { getFormErrors } from '../../helpers/get-form-errors';
import { withinSameDialog } from '../../helpers/within-same-dialog';
import { FsButtonDirective } from '../button.directive';
import { FsFormBaseDirective } from '../form-base';
import { FsFormContainerDirective } from '../form-container';

import { ConfirmResult } from './../../enums/confirm-result';
import { FormStatus } from './../../enums/form-status';
import { SubmittedEvent } from './../../interfaces';
import { SubmitEvent } from './../../interfaces/submit-event';


@Directive({
  selector: '[fsForm]',
  exportAs: 'fsForm',
  standalone: true,
})
export class FsFormDirective
  extends FsFormBaseDirective
  implements OnInit, OnDestroy, AfterContentInit, OnChanges {

  public ngForm = inject<NgForm>(NgForm);

  @Input()
  public wrapperSelector = '.fs-form-wrapper,.mat-mdc-form-field';

  @Input()
  public messageSelector = '.fs-form-message,.mat-mdc-form-field-subscript-wrapper';

  @Input()
  public hintSelector = '.fs-form-hint,.mat-mdc-form-field-hint-wrapper';

  @Input()
  public labelSelector = '.fs-form-label,.mdc-floating-label>mat-label';

  @Input()
  public autocomplete = false;

  @Input()
  public dirtySubmitButton = true;

  @Input()
  public set submit(submit$: (event: SubmitEvent) => Observable<any>) {
    this._submit$ = submit$;
  }

  public get submit(): (event: SubmitEvent) => Observable<any> {
    return this._submit$;
  }

  @Input()
  public successDelay = 0;

  @Input()
  public errorDelay = 1000;

  /**
   * Whether this form joins the set around it - the `fsForm` it is nested inside,
   * or the `fsFormContainer` enclosing it.
   *
   * Forms in a set behave as one submittable unit: the outermost form is what the
   * submit buttons drive, and validation, dirty state, the unsaved-changes
   * confirm and the pristine reset all span the set. That is what lets a form
   * wrap only one tab's fields while the dialog footer stays outside it.
   *
   * Set `[link]="false"` for a panel that owns its own saving - an instant-save
   * side panel, say. It keeps every fsForm feature for itself, but its dirty
   * state never enables the outer Save button, its validation never blocks the
   * outer submit, and the outer submit never touches it.
   */
  @Input()
  public link = true;

  @Output('fsForm')
  public submitEvent: EventEmitter<SubmitEvent> = new EventEmitter();

  @Output()
  public invalid: EventEmitter<SubmitEvent> = new EventEmitter();

  @Output()
  public valid: EventEmitter<SubmitEvent> = new EventEmitter();

  @Output()
  public submitted: EventEmitter<SubmitEvent> = new EventEmitter();

  @Output()
  public reseted: EventEmitter<SubmitEvent> = new EventEmitter();

  @Output()
  public cleared: EventEmitter<SubmitEvent> = new EventEmitter();

  @HostBinding('class.fs-form')
  public fsFormClass = true;

  private _registerControl;
  private _snapshot: { [key: string]: any } = {};
  private _status$ = new BehaviorSubject(FormStatus.Valid);
  private _submit$: (event?: SubmitEvent) => Observable<any> = null;
  private _linkedForms = new Set<FsFormDirective>();
  private _containerParent: FsFormDirective = null;
  private _dirtyChange$ = new Subject<void>();
  private _message = inject(FsMessage);
  // Both lookups walk the element injector, which reaches straight through a
  // dialog opened with `viewContainerRef` into whatever opened it. Anything
  // belonging to a different dialog is discarded, so a set never spans two.
  private _container = this._ownDialogOnly(inject(FsFormContainerDirective, { optional: true }));
  private _ancestorForm = this
    ._ownDialogOnly(inject(FsFormDirective, { optional: true, skipSelf: true }));


  /**
   * Emits whenever the set's dirty state may have moved. Anything outside the
   * form that renders off it - the dialog actions, say - can't watch
   * `ngForm.valueChanges` on its own, because the edits happen in a nested form's
   * NgForm, not this one's.
   */
  public get dirtyChange$(): Observable<void> {
    return this._dirtyChange$.asObservable();
  }

  public get submitted$(): Observable<SubmittedEvent> {
    return this.submitted.asObservable() as Observable<SubmittedEvent>;
  }

  public get status$(): Observable<FormStatus> {
    return this._status$.asObservable();
  }

  public get element(): HTMLElement {
    return this._element.nativeElement;
  }

  /** True when a Save button driving this form would have something to run. */
  public get hasSubmit(): boolean {
    return !!this._submit$;
  }

  /**
   * The form this one is linked into, or null when it is a root - either because
   * nothing encloses it or because `[link]="false"` cut it loose. A container
   * supplies the parent when the forms are siblings rather than nested.
   */
  public get parentForm(): FsFormDirective {
    if (!this.link) {
      return null;
    }

    return this._ancestorForm || this._containerParent;
  }

  /** The outermost form of this set. Submit buttons drive this one. */
  public get rootForm(): FsFormDirective {
    return this.parentForm?.rootForm || this;
  }

  /** This form plus every form linked into it, at any depth. */
  public get linkedForms(): FsFormDirective[] {
    return [
      this,
      ...[...this._linkedForms]
        .reduce((forms, form) => [...forms, ...form.linkedForms], []),
    ];
  }

  /** True when this form or anything linked into it has unsaved changes. */
  public get dirtyLinked(): boolean {
    return this.linkedForms
      .some((form) => form.ngForm.dirty);
  }

  /**
   * True when this form or anything linked into it has a submit handler - i.e.
   * there is something for a Save button to do. A dialog footer can bind to this
   * to swap Save for Done as the mounted tab changes, instead of hard-coding
   * which tab names happen to be savable.
   */
  public get submits(): boolean {
    return this.linkedForms
      .some((form) => form.hasSubmit);
  }

  public get submitting(): boolean {
    return this._status$.getValue() === FormStatus.Submitting;
  }

  public get validating(): boolean {
    return this._status$.getValue() === FormStatus.Validating;
  }

  public get completing(): boolean {
    return this._status$.getValue() === FormStatus.Completing;
  }

  /**
   * True when nothing above this form speaks for the set it belongs to. Reads the
   * raw injections rather than `parentForm`, so an unlinked panel inside a dialog
   * still defers to whatever encloses it instead of registering a second backdrop
   * confirm on the same dialog.
   */
  private get _owns(): boolean {
    return !this._ancestorForm && !this._container;
  }

  private get _submitEvent(): SubmitEvent {
    return {
      ngForm: this.ngForm,
      submitter: this._submitter,
    };
  }

  private get _formValidState$(): Observable<SubmittedEvent> {
    this.submitEvent.emit(this._submitEvent);
    this.valid.emit(this._submitEvent);

    const submittedEvent: SubmittedEvent = {
      ngForm: this.ngForm,
      submitter: this._submitter,
      response: null,
    };

    // Every form in the set gets to save. A form that only frames the layout - a
    // dialog wrapper around a tab group - carries no submit of its own and simply
    // defers to the tab form linked into it. When several are linked they run in
    // nesting order, so an outer save lands before an inner one, and the response
    // of the last is what the submit resolves with.
    const submits = this.linkedForms
      .filter((form) => form.hasSubmit)
      .map((form) => form._submit$(this._submitEvent));

    const submit$: Observable<any> = submits.length ?
      concat(...submits).pipe(toArray(), map((responses) => responses[responses.length - 1])) :
      of(submittedEvent);

    return submit$
      .pipe(
        map((response) => {
          submittedEvent.response = response;

          return submittedEvent;
        }),
        takeUntil(this.destroy$),
      );
  }

  private get _formInvalidState$(): Observable<never> {
    if (this.invalid) {
      this.invalid.emit(this._submitEvent);
    }

    const message = 'Please review errors highlighted in red';
    this._message.error(message, { mode: MessageMode.Toast });

    const el = this._element.nativeElement.querySelector('.ng-invalid');

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    return throwError(() => new Error('Form validation error'));
  }

  private get _submitter(): string {
    return this._getOwner().activeSubmitButton?.name;
  }

  public ngOnInit() {
    // A form already nested inside another links to that one, which is itself in
    // the container - so it joins the set transitively and must not also register
    // as a container sibling.
    if (this.link) {
      if (this._ancestorForm) {
        this._ancestorForm.linkForm(this);
      } else {
        this._container?.registerForm(this);
      }
    }

    // The route guard, dialog backdrop, Ctrl+S and browser close prompt all act
    // on the set as a whole, so exactly one thing registers them: a linked child
    // defers to its parent, and every form in a container defers to the container.
    if (this._owns) {
      super.ngOnInit();
    }

    this._listenSubmit();
    this._listenFormStatus();

    if (!this.autocomplete) {
      this._registerAutocomplete();
    }
  }

  /**
   * Take a nested form into this one's set. Called by the child on init, or by a
   * container linking its siblings - consumers never call it directly.
   */
  public linkForm(form: FsFormDirective): void {
    this._linkedForms.add(form);

    Promise.resolve()
      .then(() => {
        this.rootForm._updateDirtySubmitButtons();
        this._cdRef.markForCheck();
      });
  }

  public unlinkForm(form: FsFormDirective): void {
    this._linkedForms.delete(form);

    Promise.resolve()
      .then(() => {
        this.rootForm._updateDirtySubmitButtons();
        this._cdRef.markForCheck();
      });
  }

  /**
   * Adopt a parent that DI could not supply. Only a container calls this, to link
   * forms that are siblings in the template into one set.
   */
  public linkTo(form: FsFormDirective): void {
    if (!form || form === this) {
      return;
    }

    this._containerParent = form;
    form.linkForm(this);
  }

  public unlinkFrom(): void {
    this._containerParent?.unlinkForm(this);
    this._containerParent = null;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.confirm) {
      this._updateDirtySubmitButtons();
    }
  }

  public clearSubmit(submit: (event: SubmitEvent) => Observable<any> = null): void {
    if(!submit || submit === this._submit$) {
      this._submit$ = null;
    }

    setTimeout(() => {
      this._cdRef.markForCheck();
    });
  }

  public registerSubmit(submit$: () => Observable<any>): void {
    this._submit$ = submit$;

    setTimeout(() => {
      this._cdRef.markForCheck();
    });
  }

  public ngAfterContentInit(): void {
    // Tab and drawer confirmation belong to whoever owns the set. A linked child
    // shares the same tab groups and the same drawer, so letting it register too
    // would put a second confirm on the same click.
    if (this._owns) {
      super.ngAfterContentInit();
    }

    this._registerConfirm();
    this._registerDirtySubmitButton();
  }

  public ngOnDestroy(): void {
    // Deregister first: it clears the container-supplied parent, so the unlink
    // below falls through to the DI ancestor rather than repeating the same work.
    this._container?.deregisterForm(this);
    this.parentForm?.unlinkForm(this);

    super.ngOnDestroy();
  }

  public createSnapshot(): void {
    this._snapshot = this.ngForm.value;
  }

  public getSnapshot(): { [key: string]: any } {
    return this._snapshot || {};
  }

  public reset(): void {
    this.linkedForms
      .forEach((form) => {
        form.ngForm.resetForm();

        Object.keys(form.ngForm.controls)
          .forEach((name: string) => {
            const control = form.ngForm.controls[name];
            control.reset(form._snapshot[name]);
          });
      });

    this.reseted.emit();
  }

  public clear(): void {
    this.ngForm.resetForm();
    this.cleared.emit();
  }

  public dirty(): void {
    this.ngForm.form.markAsDirty();
    this._updateDirtySubmitButtons();
  }

  public pristine(): void {
    this.ngForm.form.markAsPristine();
    this._updateDirtySubmitButtons();
  }

  public triggerSubmit(options?: { confirmed: boolean }): void {
    this.ngForm.ngSubmit.emit();
  }

  public triggerConfirm(): Observable<ConfirmResult> {
    const submitted = this.submitting ? this.submitted.asObservable() : of({});

    return submitted
      .pipe(
        take(1),
        mergeMap(() => this._form.confirmUnsaved(this)),
      );
  }

  public enable(): void {
    this.ngForm.control.enable();

    this._updateDirtySubmitButtons();
  }

  public disable(): void {
    this.ngForm.control.disable();

    this._getOwner()
      .buttons.forEach((button) => {
        button.disable();
      });
  }

  public validate(): void {
    this.linkedForms
      .forEach((form) => {
        Object.values(form.ngForm.controls)
          .forEach((control) => {
            control.markAsDirty();
            control.markAsTouched();
            control.updateValueAndValidity();
          });
      });
  }

  public submit$(submitEvent?: SubmitEvent): Observable<SubmittedEvent> {
    return of(submitEvent)
      .pipe(
        tap(() => this._statusValidating()),
        tap(() => this.validate()),
        tap(() => this._statusSubmitting()),
        tap(() => this._setupActiveSubmitButton()),
        tap(() => this._disableButtons()),
        switchMap((data) => this._waitUntilStatusPending()
          .pipe(
            map(() => data),
          )),
        mergeMap(() => {
          const invalid = this.linkedForms
            .some((form) => form.ngForm.status === 'INVALID');

          if (invalid) {
            return this._formInvalidState$;
          }

          return this._formValidState$;
        }),
        catchError((e) => {
          this._handleError(e);

          return of({
            ...this._submitEvent,
            error: e?.message,
          });
        }),
        tap((submittedEvent: SubmittedEvent) => {
          if(!submittedEvent.error) {
            this._completeSubmit(true, submittedEvent);
          }
        }),
      );
  }

  private _listenSubmit(): void {
    this
      .ngForm
      .ngSubmit
      .pipe(
        tap((event) => {
          event?.preventDefault();
        }),
        filter(() => {
          return [FormStatus.Valid, FormStatus.Invalid]
            .includes(this._status$.getValue());
        }),
        switchMap(() => this.submit$(this._submitEvent)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private _listenFormStatus(): void {
    this._status$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((formStatus: FormStatus) => {
        const cls = [FormStatus.Submitting, FormStatus.Validating];
        const classList = this._element.nativeElement.classList;
        classList.remove(...cls);
        if (cls.indexOf(formStatus) !== -1) {
          classList.add(formStatus);
        }
      });

  }

  private _getActiveSubmitButton(): FsButtonDirective {
    if(this._getOwner().activeSubmitButton) {
      return this._getOwner().activeSubmitButton;
    }

    return this._getOwner()
      .buttons
      .filter((button) => button.submit)[0];
  }

  private _completeSubmit(success, submitEvent: SubmittedEvent): void {
    if (success) {
      this.linkedForms
        .forEach((form) => {
          form.ngForm.control.markAsPristine();
          form.createSnapshot();
        });

      this.submitted.emit(submitEvent);
    } else {
      this._resetButtons();
    }

    if (this._getOwner().activeSubmitButton) {
      if (success) {
        this._getOwner().activeSubmitButton.success();
      } else {
        this._getOwner().activeSubmitButton.error();
      }
    }

    this._status$.next(FormStatus.Submitted);

    if (success) {
      this._status$.next(FormStatus.Success);
    } else {
      this._status$.next(FormStatus.Error);
    }

    this._status$.next(FormStatus.Completing);

    const resetDelay = success ? this.successDelay : this.errorDelay;

    of(true)
      .pipe(
        delay(resetDelay),
        first(),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        const valid = this.linkedForms
          .every((form) => form.ngForm.form.status === 'VALID');

        if (valid) {
          this._status$.next(FormStatus.Valid);
        } else {
          this._status$.next(FormStatus.Invalid);
        }

        this._resetButtons();
        this._getOwner().activeSubmitButton = null;
        this._updateDirtySubmitButtons();
      });
  }

  /**
   * Whoever holds the submit buttons for this form. A container when one encloses
   * it, otherwise the root of its linked set - the button that saves a tab's form
   * typically sits outside it, down in the dialog footer.
   *
   * Only a form that actually joined the container may drive its buttons. DI
   * hands `_container` to every form inside, including one cut loose with
   * `[link]="false"`, and an instant-save panel is usually `[confirm]="false"`
   * too - so without this it would take the `!confirm` branch below and
   * re-enable the footer's Save button that the linked set had just disabled.
   */
  private _getOwner(): FsFormBaseDirective {
    return (this.link ? this._container : null) || this.rootForm;
  }

  /** Keeps a DI-resolved owner only when it belongs to this form's dialog. */
  private _ownDialogOnly<T extends FsFormBaseDirective>(owner: T): T {
    return withinSameDialog(owner, this._dialogRef) ? owner : null;
  }

  private _resetButtons(): void {
    this._getOwner()
      .buttons.forEach((button) => {
        button.reset();
      });
  }

  private _registerConfirm(): void {
    this.ngForm.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((changes) => {
        if(this._dialogBackdropEscape && this._dialogRef) {
          this._dialogRef.disableClose = true;
        }

        if (this.confirm) {
          const existing = Object.keys(this._snapshot);

          Object.keys(changes)
            .forEach((name: string) => {
              if (existing.indexOf(name) === -1) {
                this._snapshot[name] = changes[name];
              }
            });
        }
      });
  }

  private _registerAutocomplete(): void {
    this._registerControl = this.ngForm.form.registerControl.bind(this.ngForm.form);

    this.ngForm.form.registerControl = (name: string, control: AbstractControl) => {

      const el: Element = this._element.nativeElement.querySelector(`input[name='${name}']`);

      if (el) {
        if (!el.getAttribute('autocomplete')) {
          el.setAttribute('autocomplete', 'none');
          el.setAttribute('name', `${name}-${guid()}`);
        }
      }

      return this._registerControl(name, control);
    };
  }

  private _registerDirtySubmitButton(): void {
    if (!this.ngForm) {
      return;
    }

    // Report up: a linked child's edits have to reach the root, since that is
    // where the submit buttons live and what decides whether they are enabled.
    this.ngForm.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.rootForm._updateDirtySubmitButtons();
      });

    this._getOwner()
      .buttons.changes
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        // Buttons (de)register during change detection (their ngOnInit/ngOnDestroy),
        // so defer to a microtask to update the disabled state outside that pass and
        // avoid ExpressionChangedAfterItHasBeenChecked on the button's disabled binding.
        Promise.resolve().then(() => this._updateDirtySubmitButtons());
      });

    // The initial content buttons register (addButton) before the subscription above
    // exists, so their `changes` emission is missed. Apply the initial pristine/dirty
    // disabled state once, deferred so it runs after the current change-detection pass.
    Promise.resolve().then(() => this._updateDirtySubmitButtons());
  }

  private _updateDirtySubmitButtons(): void {
    if (!this.ngForm) {
      return;
    }

    this._dirtyChange$.next();

    this._getOwner()
      .buttons
      .filter((button) => button.submit)
      .forEach((submitButton: FsButtonDirective) => {
        if (
          !this.confirm || !this.dirtySubmitButton || this.dirtyLinked || !submitButton.dirtySubmit
        ) {
          submitButton.enable();
        } else {
          submitButton.disable();
        }
      });
  }

  private _statusSubmitting(): void {
    this._status$.next(FormStatus.Submitting);
  }

  private _statusValidating(): void {
    this._status$.next(FormStatus.Validating);
  }

  private _setupActiveSubmitButton(): void {
    this._getOwner()
      .activeSubmitButton = this._getActiveSubmitButton();
    this._resetButtons();

    if (this._getOwner().activeSubmitButton) {
      this._getOwner().activeSubmitButton.process();
    }
  }

  private _disableButtons(): void {
    this._getOwner()
      .buttons.forEach((button) => {
        button.disable();
      });
  }

  private _waitUntilStatusPending(): Observable<string[]> {
    // Async validators can be pending in any linked form, so hold the submit
    // until every one of them has settled - not just this form's.
    return combineLatest(
      this.linkedForms
        .map((form) => form.ngForm.statusChanges
          .pipe(
            startWith(form.ngForm.status),
          )),
    )
      .pipe(
        first((states) => states.every((state) => state !== 'PENDING')),
      );
  }

  private _handleError(e: SubmittedEvent) {
    console.log('%c Form Submit ', 'color: white; background-color: #D33F49', 'Error occured');
    console.group('Error Details:');
    console.log('Message: ', e);
    console.log('FormRef: ', this);

    if (this.ngForm.invalid) {
      const errors = getFormErrors(this.ngForm.control, null);
      console.log('Validation Errors: ', errors);
    }

    console.groupEnd();
    this._completeSubmit(false, null);
  }

}
