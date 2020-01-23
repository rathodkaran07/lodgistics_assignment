import { createAction, props } from '@ngrx/store';

export const appReady = createAction('[Util] App ready');
export const storageReady = createAction('[Util] Storage ready');

export const loadData = createAction('[Data] Load Project data');
export const loadDataSuccess = createAction('[Data] Project data success', props<{appData: any}>());
export const loadDataFailure = createAction('[Data] Project data failure', props<{error: string}>());
