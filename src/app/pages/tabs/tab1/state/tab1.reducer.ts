import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { AppState } from '@app/state/app.reducer';

import { Tab1Actions } from '@app/pages/tabs/tab1/state';
import { Employee } from '@app/shared/models';

export const tab1FeatureKey = 'Tab1';

export interface Tab1State {
	isLoading: boolean;
	isError: boolean;
	data: any | null;
	error: any | null;
}

const initialState: Tab1State = {
	isLoading: false,
	isError: false,
	data: null,
	error: null
};

interface State extends AppState {
	[tab1FeatureKey]: Tab1State;
}

const reducer = createReducer(
	initialState,
	on(Tab1Actions.getEmployee, state => ({
		...state,
		isLoading: true,
		isError: false,
		error: null
	})),
	on(Tab1Actions.getEmployeeSuccess, (state, {data}) => ({
		...state,
		isLoading: false,
		isError: false,
		data,
		error: null
	})),
	on(Tab1Actions.getEmployeeFailure, (state, {error}) => ({
		...state,
		isLoading: false,
		isError: true,
		error
	})),
	on(Tab1Actions.deleteEmployee, (state, {id}) => ({
		...state,
		data: state.data.filter((item) => {
			return item.id !== id;
		})
	})),
	on(Tab1Actions.updateEmployeeImage, (state, {id, imageData}) => {
		const index = state.data.findIndex(item => item.id === id);
		const updatedEmployee: Employee = {
			...state.data[index]
		};
		updatedEmployee.profile_image = imageData;

		const allEmployees = [...state.data];
		allEmployees[index] = updatedEmployee;

		return {...state, data: allEmployees};
	})
);

export function tab1Reducer(state: Tab1State | undefined, action: Action) {
	return reducer(state, action);
}

export const selectRootState = createFeatureSelector<State, Tab1State>(tab1FeatureKey);
export const getIsLoading = createSelector(selectRootState, (state: Tab1State) => state.isLoading);
export const getIsError = createSelector(selectRootState, (state: Tab1State) => state.isError);
export const getData = createSelector(selectRootState, (state: Tab1State) => state.data);
export const getError = createSelector(selectRootState, (state: Tab1State) => state.error);
