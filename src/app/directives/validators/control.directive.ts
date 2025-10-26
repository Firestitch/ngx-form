import { AfterContentInit, Directive, ElementRef, Injector, Input, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
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
    standalone: true,
})
export class FsControlDirective implements OnInit, AfterContentInit, OnDestroy {
  protected _elementRef = inject(ElementRef);
  protected _renderer2 = inject(Renderer2);
  protected _injector = inject(Injector);
  protected _validateMessages = inject(VALIDATE_MESSAGES, { self: true });
  protected _ngControl = inject(NgControl, { optional: true });
  protected _formDirective = inject<FsFormDirective>(FsFormDirective, { optional: true });


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

  constructor() {
    const _ngControl = this._ngControl;


    if (_ngControl) {
      this._control = _ngControl.control;
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

    } else if (this._formDirective?.messageSelector) {
      return this._formDirective.messageSelector;
    }
  }

  public getHintWrapperSelector(): string {
    if (this.hintSelector === false) {
      return '';
    }

    if (this.hintSelector) {
      return this.hintSelector;

    } else if (this._formDirective?.hintSelector) {
      return this._formDirective.hintSelector;
    }
  }

  public getWrapperSelector(): string {
    if (this.wrapperSelector === false) {
      return '';
    }

    if (this.wrapperSelector) {
      return this.wrapperSelector;

    } else if (this._formDirective?.wrapperSelector) {
      return this._formDirective.wrapperSelector;
    }
  }

  public getlabelSelector(): string {

    if (this.labelSelector === false) {
      return '';
    }

    if (this.labelSelector) {
      return this.labelSelector;

    } else if (this._formDirective?.labelSelector) {
      return this._formDirective.labelSelector;
    }
  }

  public getWrapperElement() {
    const wrapper = this._getWrapper(this._elementRef.nativeElement);

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

  private get _shouldErrorBeRendered() {
    return this._ngControl.invalid
      && (this._ngControl.dirty || this._formDirective?.ngForm?.submitted);
  }

  public render() {
    if (this._ngControl) {
      const renderer = this._renderer2;
      const wrapper = this.getWrapperElement();
      const error = this._ngControl.dirty ? this._getError(this._ngControl) : null;

      if (this._shouldErrorBeRendered && error) {
        wrapper.classList.add('ng-invalid', 'ng-dirty');
      } else {
        wrapper.classList.remove('ng-invalid');
      }

      if (!this.getMessageSelector()) {
        return;
      }

      const messageWrapper = wrapper.querySelector(this.getMessageSelector());
   
      if (!messageWrapper) {
        return console
          .warn(`Failed to locate ${  this.getMessageSelector()}`, this._elementRef.nativeElement);
      }

      if (this.appendMessageClass) {
        renderer.addClass(messageWrapper, this.appendMessageClass);
      }

      this._renderHint(error, messageWrapper);
      this._renderError(wrapper, messageWrapper, error);
    }
  }

  protected _renderHint(error, messageWrapper) {
    const hints = [
      ...messageWrapper.querySelectorAll('.mat-mdc-form-field-hint'),
      ...messageWrapper.querySelectorAll(this.getHintWrapperSelector()),
    ];

    hints.forEach((hint) => {
      this._renderer2.setStyle(hint, 'display', error ? 'none' : 'block');

      if (this.appendHintClass) {
        this._renderer2.addClass(hint, this.appendHintClass);
      }
    });
  }

  protected _renderError(wrapper, messageWrapper, error) {
    let errorWrapper = wrapper.querySelector('.fs-form-error-target');
    if (errorWrapper) {
      errorWrapper.remove();
    }

    if (!this._shouldErrorBeRendered || !error) {
      return;
    }

    errorWrapper = this._renderer2.createElement('div');
    this._renderer2.addClass(errorWrapper, 'fs-form-error-target');
    this._renderer2.addClass(errorWrapper, this.appendErrorClass);
    this._renderer2.addClass(errorWrapper, `${this.appendErrorClass  }-${  error.name}`);

    const errorText = this._renderer2.createText(error.message);

    this._renderer2.appendChild(errorWrapper, errorText);
    
    messageWrapper?.prepend(errorWrapper);
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

  protected _getWrapper(node, count = 0) {
    if (!node || count > 10) {
      return null;
    }

    if (node.parentNode && node.parentNode.querySelector(this.getWrapperSelector())) {
      return node;
    }

    return this._getWrapper(node.parentNode, ++count);
  }

  protected _parseErrorMessage(message, args): string {
    values(args)
      .forEach((name) => {
        message = message.replace(/\$\(\d\)/, name);
      });

    return message;
  }

  protected _getError(controlRef): { name: string, message: string } {

    const name = keys(controlRef.control.errors)[0];

    if (!name) {
      return null;
    }

    let message = controlRef.control.errors[name];

    if (this._validateMessages[name]) {
      message = this._parseErrorMessage(this._validateMessages[name], message);
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
