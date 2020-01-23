import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { ApiService } from '@app/shared/services/api.service';

import { Employee, Response } from '@app/shared/models';
import { catchError, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class Tab1Service {
	private readonly actionUrl: string;

	constructor(private apiService: ApiService) {
		this.actionUrl = environment.apiUrl + '/employees';
	}

	getAllEmployees(): Observable<Response<Employee[]>> {
		return this.apiService.get<Response<Employee[]>>(this.actionUrl).pipe(
			retry(1),
			catchError(this.handleError<any>('getAllEmployees'))
		);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			/*let errorMessage = '';
			if (error.error instanceof ErrorEvent) {
				// Get client-side error
				errorMessage = error.error.message;
			} else {
				// Get server-side error
				errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
			}*/

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
