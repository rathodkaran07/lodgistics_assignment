import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { debug } from '@app/state/debug.reducer';
import { environment } from '@env/environment';

export interface AppState {
	router: fromRouter.RouterReducerState;
}

export const appReducer = new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers token', {
	factory: () => ({
		router: fromRouter.routerReducer
	})
});

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug] : [];

export const selectRouter = createFeatureSelector<AppState, fromRouter.RouterReducerState>('router');

export const {
	selectQueryParams,    // select the current route query params
	selectQueryParam,     // factory function to select a query param
	selectRouteParams,    // select the current route params
	selectRouteParam,     // factory function to select a route param
	selectRouteData,      // select the current route data
	selectUrl            // select the current url
} = fromRouter.getSelectors(selectRouter);
