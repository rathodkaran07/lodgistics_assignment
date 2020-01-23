import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { UtilEffects } from '@app/state/util/util.effects';
import { utilFeatureKey, utilReducer } from '@app/state/util/util.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	imports: [
		StoreModule.forFeature(utilFeatureKey, utilReducer),
		EffectsModule.forFeature([UtilEffects])
	],
	declarations: []
})
export class UtilStateModule {
	constructor() {
	}
}
