import { Type } from '@angular/core';
import { Route } from '@angular/router';


/**
 * The component a route renders, however the route declares it.
 *
 * `component:` and `loadComponent:` do NOT land in the same place. The router
 * resolves a lazy component into `_loadedComponent` on the route CONFIG and
 * assigns `component` only on the ActivatedRouteSnapshot — so a `loadComponent`
 * route's `routeConfig.component` is `undefined` for the life of the route.
 * Angular reads it as `component ?? _loadedComponent ?? null` everywhere it
 * needs the type; this does the same.
 *
 * It matters here because the config's component is the WeakMap key the form
 * store is keyed by. Reading `.component` alone hands `undefined` to
 * `WeakMap.set()`, which throws "Invalid value used as weak map key" out of
 * ngOnInit — aborting the hook and leaving the screen half-rendered. Every
 * route written with `loadComponent` hit that.
 *
 * `_loadedComponent` is Angular-private and absent from the public `Route`
 * type, hence the cast.
 */
export function getRouteComponent(route: Route): Type<any> {
  return route?.component ?? (route as { _loadedComponent?: Type<any> })?._loadedComponent;
}
