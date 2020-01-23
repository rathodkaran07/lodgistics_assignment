import { Action, createReducer, on } from '@ngrx/store';

import { UtilActions } from '@app/state/util';
import { AppState } from '@app/state/app.reducer';

export const utilFeatureKey = 'util';

export interface UtilState {
	appReady: boolean;
	storageReady: boolean;
	appData: any | null;
}

const initialState: UtilState = {
	appReady: false,
	storageReady: false,
	appData: null
};

interface State extends AppState {
	[utilFeatureKey]: UtilState;
}

const reducer = createReducer(
	initialState,
	// Even thought the `state` is unused, it helps infer the return type
	on(UtilActions.appReady, state => ({...state, appReady: true})),
	on(UtilActions.storageReady, state => ({...state, storageReady: true})),
	on(UtilActions.loadData, state => ({...state})),
	on(UtilActions.loadDataSuccess, (state, {appData}) => ({...state, appData})),
	on(UtilActions.loadDataFailure, (state, {error}) => ({...state, error})),
);

export function utilReducer(state: UtilState | undefined, action: Action) {
	return reducer(state, action);
}

export const getAppReady = (state: UtilState) => state.appReady;
export const getStorageReady = (state: UtilState) => state.storageReady;

export const getProjectData = (state: UtilState) => state.appData;
