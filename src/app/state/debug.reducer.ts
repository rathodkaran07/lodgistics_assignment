import { ActionReducer } from '@ngrx/store';
import * as fromApp from '@app/state/app.reducer';

export function debug(reducer: ActionReducer<fromApp.AppState>): ActionReducer<fromApp.AppState> {
	return (state, action) => {
		const result = reducer(state, action);
		console.groupCollapsed(action.type);
		console.log('prev state', state);
		console.log('action', action);
		console.log('next state', result);
		console.groupEnd();

		return result;
	};
}
