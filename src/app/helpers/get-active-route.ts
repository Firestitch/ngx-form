import { ActivatedRoute } from '@angular/router';


export function getActiveRoute(route: ActivatedRoute): ActivatedRoute {
  while (route.firstChild) {
    route = route.firstChild;
  }

  return route;
}
