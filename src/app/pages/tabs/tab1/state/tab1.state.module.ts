import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tab1FeatureKey, tab1Reducer } from '@app/pages/tabs/tab1/state/tab1.reducer';
import { Tab1Effects } from '@app/pages/tabs/tab1/state/tab1.effects';

@NgModule({
	imports: [
		StoreModule.forFeature(tab1FeatureKey, tab1Reducer),
		EffectsModule.forFeature([Tab1Effects])
	],
	declarations: []
})
export class Tab1StateModule {
	constructor() {
	}
}
