import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StorageService } from '@app/shared/services/storage.service';
import { ToastService } from '@app/shared/services/toast.service';
import { DetailsModalComponent } from '@app/shared/component/modal/details.modal.component';

@NgModule({
	declarations: [
		DetailsModalComponent
	],
	entryComponents: [
		DetailsModalComponent
	],
	imports: [
		/* 3rd party libraries */
		CommonModule,
		IonicModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [],
	providers: [
		/* our own custom services  */
		StorageService, ToastService
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
	/* make sure SharedModule is imported only by one NgModule the AppModule */
	/*constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
		if (parentModule) {
			throw new Error(
				'SharedModule is already loaded. Import it in the AppModule only');
		}
	}

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: []
		};
	}*/
}
