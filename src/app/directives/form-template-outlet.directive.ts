import {
  TemplateRef,
  Directive,
  Input,
  ViewContainerRef,
  Injector,
  inject,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[fsFormTemplateOutlet]',
})
export class FsFormTemplateOutletDirective implements OnInit {

  @Input()
  public template: TemplateRef<any>;

  @Input()
  public context: Record<string, unknown> = {};

  protected _viewContainerRef: ViewContainerRef = inject(ViewContainerRef)
  protected _injector: Injector = inject(Injector);

  public ngOnInit() {
    this._viewContainerRef.createEmbeddedView(
      this.template,
      this.context,
      {
        injector: this._injector,
      },
    )
  }
}
