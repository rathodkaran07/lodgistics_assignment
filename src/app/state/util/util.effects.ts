import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class UtilEffects {
	constructor(private actions$: ActionsSubject) {
	}
}
