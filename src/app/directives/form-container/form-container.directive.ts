import { Directive } from '@angular/core';

import { defer, EMPTY, Observable, of, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { ConfirmResult } from '../../enums';
import { FormStatus } from '../../enums/form-status';
import { FsFormOwner, SubmitEvent, SubmittedEvent } from '../../interfaces';
import { FsFormBaseDirective } from '../form-base';

import type { FsFormDirective } from '../form/form.directive';


/**
 * Bounds a set of forms without being one.
 *
 * An `fsForm` can only reach the forms nested inside it through DI, which forces
 * a wrapper carrying `ngForm` around anything that needs to see them - and that
 * wrapper then owns a real, empty `NgForm` whose control namespace every field
 * below it falls into. A container has no `ngForm` and no controls. It only
 * watches: forms register themselves as they mount, buttons resolve to it, and
 * `fs-form-dialog-actions` reads Save-vs-Done off it. Put it on whatever element
 * already frames the layout - or on an `<ng-container>` for no element at all.
 *
 * Forms in a container are siblings rather than nested, so on registration each
 * one is linked into the first. That reproduces exactly the structure DI nesting
 * builds, which is why validation, dirty state, the unsaved-changes confirm and
 * the submit chain all span a container without any of that machinery knowing
 * containers exist.
 *
 * A form marked `[link]="false"` never registers, so an instant-save panel stays
 * out of the set the same way it does when nested.
 */
@Directive({
  selector: 'fs-form-container,[fsFormContainer]',
  exportAs: 'fsFormContainer',
  standalone: true,
})
export class FsFormContainerDirective extends FsFormBaseDirective implements FsFormOwner {

  private _forms: FsFormDirective[] = [];
  private _formsChange$ = new Subject<void>();

  /** The forms registered into this container, in registration order. */
  public get forms(): FsFormDirective[] {
    return [...this._forms];
  }

  /**
   * The form the rest of the set is linked into, or null while the container
   * holds none - an open tab that has nothing to save, say.
   */
  public get rootForm(): FsFormDirective {
    return this._forms[0] || null;
  }

  /** Emits whenever a form registers or deregisters. */
  public get formsChange$(): Observable<void> {
    return this._formsChange$.asObservable();
  }

  public get linkedForms(): FsFormDirective[] {
    return this.rootForm?.linkedForms || [];
  }

  /**
   * True when anything in the container has a submit handler - i.e. there is
   * something for a Save button to do. `fs-form-dialog-actions` reads this to
   * swap Save for Done as the mounted tab changes, so a dialog never has to keep
   * a list of which tabs happen to be savable.
   */
  public get submits(): boolean {
    return this.linkedForms
      .some((form) => form.hasSubmit);
  }

  public get dirtyLinked(): boolean {
    return this.rootForm?.dirtyLinked || false;
  }

  public get submitting(): boolean {
    return this.rootForm?.submitting || false;
  }

  /**
   * Emits whenever the set's dirty state may have moved, including when the set
   * itself changes. Anything rendering off it - the dialog actions - subscribes
   * once and outlives any particular form, so this has to follow the root across
   * tab switches rather than bind to whichever form happened to be first.
   */
  public get dirtyChange$(): Observable<void> {
    return this._formsChange$
      .pipe(
        startWith(null),
        switchMap(() => (this.rootForm?.dirtyChange$ || EMPTY)
          .pipe(
            startWith(null),
          )),
        map(() => undefined),
      );
  }

  // Resolved at subscribe time rather than switch-mapped: a submit in flight has
  // to survive the set changing under it, which is routine when saving unmounts
  // a tab.
  public get submitted$(): Observable<SubmittedEvent> {
    return defer(() => this.rootForm?.submitted$ || EMPTY);
  }

  public get status$(): Observable<FormStatus> {
    return defer(() => this.rootForm?.status$ || of(FormStatus.Valid));
  }

  /**
   * Take a form into the container. Called by the form on init - consumers never
   * call it directly.
   */
  public registerForm(form: FsFormDirective): void {
    if (this._forms.indexOf(form) !== -1) {
      return;
    }

    this._forms = [...this._forms, form];

    if (this.rootForm !== form) {
      form.linkTo(this.rootForm);
    }

    this._formsChange$.next();
  }

  /**
   * Material attaches an incoming tab body before it detaches the outgoing one,
   * so losing the root is a routine reshuffle rather than teardown. Re-elect and
   * re-link the survivors instead of leaving them pointing at a dead root, and
   * only let go of forms actually registered - clearing unconditionally would
   * drop the form that just arrived.
   */
  public deregisterForm(form?: FsFormDirective): void {
    if (form && this._forms.indexOf(form) === -1) {
      return;
    }

    const removing = form ? [form] : [...this._forms];
    const rootRemoved = removing.indexOf(this.rootForm) !== -1;

    removing.forEach((item) => item.unlinkFrom());

    this._forms = this._forms
      .filter((item) => removing.indexOf(item) === -1);

    if (rootRemoved) {
      const root = this.rootForm;

      this._forms
        .filter((item) => item !== root)
        .forEach((item) => {
          item.unlinkFrom();
          item.linkTo(root);
        });
    }

    this._formsChange$.next();
  }

  public triggerSubmit(): void {
    this.rootForm?.triggerSubmit();
  }

  public triggerConfirm(): Observable<ConfirmResult> {
    return this.rootForm
      ? this.rootForm.triggerConfirm()
      : of(ConfirmResult.NoChanges);
  }

  public submit$(event?: SubmitEvent): Observable<SubmittedEvent> {
    return this.rootForm
      ? this.rootForm.submit$(event)
      : of(null);
  }

  public reset(): void {
    this.rootForm?.reset();
  }

  public validate(): void {
    this.rootForm?.validate();
  }

  // The container's own element is a poor proxy for what it covers: it is
  // typically layout chrome wrapping far more than the forms, and on an
  // `<ng-container>` it is a comment node containing nothing at all. Scope to the
  // registered forms instead.
  protected override _containsElement(el: Element): boolean {
    return this._forms
      .some((form) => this._nodeContains(form.element, el));
  }
}
