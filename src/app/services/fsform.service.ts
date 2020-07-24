import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface BroadcastEvent {
    key: any;
    data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class FsForm {
    private _eventBus: Subject<BroadcastEvent>;

    constructor() {
      this._eventBus = new Subject<BroadcastEvent>();
    }

    broadcast(key: any, data?: any) {
      this._eventBus.next({key, data});
    }

    on<T>(key: any): Observable<T> {
      return this._eventBus.asObservable()
        .pipe(
          filter(event => event.key === key),
          map(event => <T>event.data)
        );
    }
}
