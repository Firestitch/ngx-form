import { Injectable, Type } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { FsFormDirective } from '../directives/form/form.directive';

interface BroadcastEvent {
    key: any;
    data?: any;
}


@Injectable({
  providedIn: 'root',
})
export class FsForm {

  // value is array for future possibilities of extension
  private _formDirectiveStore = new WeakMap<Type<any>, FsFormDirective[]>();

  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  // @deprecated
  public broadcast(key: any, data?: any) {
    this._eventBus.next({ key, data });
  }

  // @deprecated
  public on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .pipe(
        filter((event) => event.key === key),
        map((event) => <T>event.data),
      );
  }

  public registerFormDirective(routeComponent: Type<any>, directive: FsFormDirective) {
    const directives = this.getFormDirectives(routeComponent) || [];
    directives.push(directive);

    this._formDirectiveStore.set(routeComponent, directives);
  }

  public getFormDirectives(routeComponent): FsFormDirective[] {
    return this._formDirectiveStore.get(routeComponent);
  }

  public removeFormDirective(routeComponent) {
    this._formDirectiveStore.delete(routeComponent);
  }
}
