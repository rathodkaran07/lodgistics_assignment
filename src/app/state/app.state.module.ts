import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterEffects } from '@app/state/router.effects';

import { appReducer, metaReducers } from '@app/state/app.reducer';

import { environment } from '@env/environment';
import { UtilStateModule } from '@app/state/util/util.state.module';

@NgModule({
	imports: [
		StoreModule.forRoot(appReducer, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictStateSerializability: true,
				strictActionSerializability: true
			}
		}),
		StoreRouterConnectingModule.forRoot({
			routerState: RouterState.Minimal
		}),
		!environment.production ? StoreDevtoolsModule.instrument({name: 'Lodgistics'}) : [],
		EffectsModule.forRoot([RouterEffects]),
		UtilStateModule
	],
	declarations: []
})
export class AppStateModule {
	constructor(@Optional() @SkipSelf() parentModule: AppStateModule) {
		if (parentModule) {
			throw new Error(
				'StateModule is already loaded. Import it in the AppModule only');
		}
	}

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AppStateModule,
			providers: []
		};
	}
}
