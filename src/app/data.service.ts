import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  of,
  throwError,
  BehaviorSubject,
  map,
  switchMap,
  tap,
  lastValueFrom,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public alertSubject = new BehaviorSubject<any>(null);
  public alertObservable = this.alertSubject.asObservable();

  getUser(userId: number) {
    return this.http
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .pipe(catchError((err) => throwError(err)));
  }

  getToDos(userId: number) {
    //return throwError('error getting todos'); //uncomment this to test how errors are handled when getToDos() fails
    return this.http
      .get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .pipe(catchError((err) => throwError(err)));
  }

  setUser(data) {
    console.log(data);
  }

  setToDos(data) {
    console.log(data);
  }

  initialiseAppUsingObservables() {
    //replace 5 with 50 to test how error is handled in getUser()
    return this.getUser(5).pipe(
      switchMap((x: any) => {
        this.setUser(x);
        return this.getToDos(x.id).pipe(tap((y) => this.setToDos(y)));
      }),
      catchError((err) => {
        this.alertSubject.next(err);
        return of(err);
      })
    );
  }

  initialiseAppUsingPromises() {
    let obsv$ = this.initialiseAppUsingObservables();
    return lastValueFrom(obsv$); //alternative to toPromise()
  }
}
