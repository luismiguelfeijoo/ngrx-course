// import { Injectable } from "@angular/core";

import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { filter, first, map, tap } from "rxjs/operators";
import { CourseEntityService } from "./course-entity.service";

// @Injectable() 
// export class CourseResolver implements Res{

// }

export const courseResolver: ResolveFn<boolean> = (route, state) => {
  const courseService = inject(CourseEntityService);

  return courseService.loaded$.pipe(tap(loaded => {
    if (!loaded) {
      courseService.getAll(); 
    }
  }),filter(loaded => !!loaded), first())
}