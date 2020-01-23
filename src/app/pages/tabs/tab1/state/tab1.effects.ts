import { Injectable } from '@angular/core';

import { ActionsSubject } from '@ngrx/store';
import { createEffect, ofType } from '@ngrx/effects';
import { Tab1Actions } from '@app/pages/tabs/tab1/state';
import { of } from 'rxjs';
import { catchError, map, share, switchMap } from 'rxjs/operators';
import { Tab1Service } from '@app/pages/tabs/tab1/tab1.service';

@Injectable({providedIn: 'root'})
export class Tab1Effects {
	constructor(private actions$: ActionsSubject, private tab1Service: Tab1Service) {
	}

	connect$ = createEffect(() => this.actions$.pipe(
		ofType(Tab1Actions.getEmployee),
		switchMap(action => this.tab1Service.getAllEmployees().pipe(
			// tslint:disable-next-line:triple-equals max-line-length
			map(data => data.status.toLowerCase() == 'success' ? Tab1Actions.getEmployeeSuccess({data: data.data}) : Tab1Actions.getEmployeeFailure({error: 'Something went wrong !!'})),
			catchError(error => of(Tab1Actions.getEmployeeFailure({error})))
		)),
		share()
	));
}
