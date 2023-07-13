import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable()
export class CourseDataService extends DefaultDataService<Course> {
  constructor(http: HttpClient,httpUrlGenerator: HttpUrlGenerator) {
    super('Course', http, httpUrlGenerator);
  }

  getAll(options?: HttpOptions): Observable<Course[]> {
    return this.http.get<{payload: Course[]}>('/api/courses').pipe(map(response => response.payload));
  }
}