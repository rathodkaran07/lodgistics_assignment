import { createAction, props } from '@ngrx/store';

// tslint:disable-next-line:max-line-length
export const getEmployee = createAction('[Tab1 UI] Employee');
export const getEmployeeSuccess = createAction('[Data] Employee data success', props<{data: any}>());
export const getEmployeeFailure = createAction('[Data] Employee data failure', props<{error: any}>());

export const deleteEmployee = createAction('[Tab1 UI] Delete Employee', props<{id: any}>());
export const updateEmployeeImage = createAction('[Tab1 UI] Update Employee Profile Image', props<{id: any, imageData: any}>());
