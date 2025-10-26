import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';
import { FsTabsModule } from '@firestitch/tabs';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'deactivate-leave',
    templateUrl: 'deactivate-leave.component.html',
    styleUrls: ['deactivate-leave.component.css'],
    standalone: true,
    imports: [MatAnchor, FsButtonDirective, FsTabsModule, RouterLink]
})
export class DeactivateLeaveComponent {
}
