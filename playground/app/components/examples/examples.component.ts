import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { environment } from '../../../environments/environment';
import { DeactivateComponent } from '../deactivate/deactivate.component';
import { FsExampleModule } from '@firestitch/example';
import { FirstExampleComponent } from '../first-example/first-example.component';
import { FunctionComponent } from '../function/function.component';
import { EmitExampleComponent } from '../emit-example/emit-example.component';
import { NestedComponent } from '../nested/nested.component';
import { NonMaterialComponent } from '../non-material/non-material.component';
import { SubmitObservableComponent } from '../submit-observable/submit-observable.component';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { DrawerExampleComponent } from '../drawer-example/drawer-example.component';
import { TabsExampleComponent } from '../tabs-example/tabs-example.component';
import { TemplateComponent } from '../template/template.component';


@Component({
    templateUrl: './examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsExampleModule,
        FirstExampleComponent,
        FunctionComponent,
        EmitExampleComponent,
        NestedComponent,
        NonMaterialComponent,
        SubmitObservableComponent,
        DeactivateComponent,
        DialogExampleComponent,
        DrawerExampleComponent,
        TabsExampleComponent,
        TemplateComponent,
    ],
})
export class ExamplesComponent {

  public config = environment;

  @ViewChild(DeactivateComponent)
  public deactivate: DeactivateComponent;

}

