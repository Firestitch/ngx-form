import {
  AfterContentInit,
  Directive,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
} from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { keys, values } from 'lodash-es';

import {
  VALIDATE_MESSAGE_PROVIDER,
  VALIDATE_MESSAGES,
} from '../../providers/validate-messages.provider';
import { FsFormDirective } from '../form/form.directive';


export interface FsControlDirective {
  validate?(control: AbstractControl): ValidationErrors | null;
  validateAsync?(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
}


@Directive({
  selector: '[fsFormControl]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER,
  ],
})
export class FsControlDirective implements OnInit, AfterContentInit, OnDestroy {

  @Input() public wrapperSelector: string | false;
  @Input() public messageSelector: string | false;
  @Input() public hintSelector: string | false;
  @Input() public labelSelector: string | false;
  @Input() public appendMessageClass = 'fs-form-message';
  @Input() public appendLabelClass = 'fs-form-label';
  @Input() public appendErrorClass = 'fs-form-error';
  @Input() public appendHintClass = 'fs-form-hint';

  @Input()
  public set validateMessages(messages: Record<string, string>) {
    this._validateMessages = {
      ...this._validateMessages,
      ...messages,
    };
  }

  public errors = [];

  protected _control: AbstractControl;

  private _destroy$ = new Subject();

  constructor(
    protected _elementRef: ElementRef,
    protected renderer2: Renderer2,
    protected injector: Injector,
    @Self() @Inject(VALIDATE_MESSAGES) protected _validateMessages,
    @Optional() protected ngControl: NgControl,
    @Optional() @Inject(FsFormDirective) protected formDirective: FsFormDirective,
  ) {

    if (ngControl) {
      this._control = ngControl.control;
    } else {
      console.error('The element does not have a valid ngModel', this._elementRef.nativeElement);
    }
  }

  public ngOnInit() {
    this._setupValidators();
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public ngAfterContentInit() {
    this._subscribeToStatusChagnes();
  }

  public getMessageSelector(): string {
    if (this.messageSelector === false) {
      return '';
    }

    if (this.messageSelector) {
      return this.messageSelector;

    } else if (this.formDirective?.messageSelector) {
      return this.formDirective.messageSelector;
    }
  }

  public getHintWrapperSelector(): string {
    if (this.hintSelector === false) {
      return '';
    }

    if (this.hintSelector) {
      return this.hintSelector;

    } else if (this.formDirective?.hintSelector) {
      return this.formDirective.hintSelector;
    }
  }

  public getWrapperSelector(): string {
    if (this.wrapperSelector === false) {
      return '';
    }

    if (this.wrapperSelector) {
      return this.wrapperSelector;

    } else if (this.formDirective?.wrapperSelector) {
      return this.formDirective.wrapperSelector;
    }
  }

  public getlabelSelector(): string {

    if (this.labelSelector === false) {
      return '';
    }

    if (this.labelSelector) {
      return this.labelSelector;

    } else if (this.formDirective?.labelSelector) {
      return this.formDirective.labelSelector;
    }
  }

  public getWrapperElement() {

    const wrapper = this.getWrapper(this._elementRef.nativeElement);

    if (wrapper) {
      return wrapper;
    }

    return this._elementRef.nativeElement;
  }

  /*
    <mat-form-field class="mat-form-field">  <-- Field Wrapper Class. Look for parents from the native element with the matching wrapperSelector. If not found defaults to native element.
      <input>
      <div class="fs-form-message"> <-- Message Selector. Look for the element with class .fs-form-message or messageSelector
        <div class="fs-form-message"></div>
        <div class="fs-form-hint"></div> <-- Hint Selector. Look for the element with class .fs-form-hint or hintSelector
      </div>
    </mat-form-field>
  */
  protected render() {
    if (this.ngControl) {
      const renderer = this.renderer2;
      const wrapper = this.getWrapperElement();
      const error = this.ngControl.dirty ? this.getError(this.ngControl) : null;
      const shouldErrorBeRendered = this.ngControl.invalid
        && (this.ngControl.dirty || this.formDirective?.ngForm?.submitted);

      if (shouldErrorBeRendered && error) {
        wrapper.classList.add('ng-invalid', 'ng-dirty');
      } else {
        wrapper.classList.remove('ng-invalid');
      }

      if (!this.getMessageSelector()) {
        return;
      }

      const messageWrapper = wrapper.querySelector(this.getMessageSelector());

      if (!messageWrapper) {
        return console.warn(`Failed to locate ${  this.getMessageSelector()}`, this._elementRef.nativeElement);
      }

      if (this.getlabelSelector()) {
        const labelWrapper = wrapper.querySelector(this.getlabelSelector());

        if (labelWrapper) {
          if (this.appendLabelClass) {
            this.renderer2.addClass(labelWrapper, this.appendLabelClass);
          }
        }
      }

      if (this.appendMessageClass) {
        renderer.addClass(messageWrapper, this.appendMessageClass);
      }

      if (this.getHintWrapperSelector()) {
        const hint = messageWrapper.querySelector(this.getHintWrapperSelector());

        if (hint) {
          renderer.setStyle(hint, 'display', error ? 'none' : 'block');

          if (this.appendHintClass) {
            renderer.addClass(hint, this.appendHintClass);
          }
        }
      }

      let errorWrapper = wrapper.querySelector('.fs-form-error-target');
      if (errorWrapper) {
        errorWrapper.remove();
      }

      if (!shouldErrorBeRendered || !error) {
        return;
      }

      errorWrapper = renderer.createElement('div');
      renderer.addClass(errorWrapper, 'fs-form-error-target');
      renderer.addClass(errorWrapper, this.appendErrorClass);
      renderer.addClass(errorWrapper, `${this.appendErrorClass  }-${  error.name}`);

      const errorText = renderer.createText(error.message);

      renderer.appendChild(errorWrapper, errorText);
      messageWrapper.appendChild(errorWrapper);
    }
  }

  protected _subscribeToStatusChagnes():void {
    if (this._control) {
      this._control.statusChanges
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe(this.render.bind(this));
    }
  }


  protected getWrapper(node, count = 0) {
    if (!node || count > 10) {
      return null;
    }

    if (node.parentNode && node.parentNode.querySelector(this.getWrapperSelector())) {
      return node;
    }

    return this.getWrapper(node.parentNode, ++count);
  }

  protected parseErrorMessage(message, args): string {
    values(args)
      .forEach((name) => {
        message = message.replace(/\$\(\d\)/, name);
      });

    return message;
  }

  protected getError(controlRef): { name: string, message: string } {

    const name = keys(controlRef.control.errors)[0];

    if (!name) {
      return null;
    }

    let message = controlRef.control.errors[name];

    if (this._validateMessages[name]) {
      message = this.parseErrorMessage(this._validateMessages[name], message);
    }

    return { name: name, message: message };
  }

  private _setupValidators(): void {
    const control = this._control;

    if (this.validate) {
      const validators = control.validator
        ? [control.validator, this.validate.bind(this)]
        : this.validate.bind(this);

      control.setValidators(validators);
    }

    if (this.validateAsync) {
      const asyncValidators = control.asyncValidator
        ? [control.asyncValidator, this.validateAsync.bind(this)]
        : this.validateAsync.bind(this);

      control.setAsyncValidators(asyncValidators);
    }

    control.updateValueAndValidity();
  }

}
