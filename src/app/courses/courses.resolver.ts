import { inject, Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.actions";
import { areCoursesLoaded } from "./courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}

export const coursesResolver: ResolveFn<any> = (route, state) => {
  const store = inject(Store);
  let loading = false;
  return store.pipe(
    select(areCoursesLoaded),
    tap((areCoursesLoaded) => {
      if (!loading && !areCoursesLoaded) {
      loading = true;
      store.dispatch(loadAllCourses());
      }
    }),
    filter(areCoursesLoaded => areCoursesLoaded),
    first(),
    finalize(() => {
      loading = false
    })
  );
};
