import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoggerService } from '@app/core/services/logger/logger.service';
import { HeaderInterceptor, LogResponseInterceptor } from '@app/core/interceptors';
import { ConsoleLoggerService } from '@app/core/services/logger/console-logger.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
		/* 3rd party libraries */
	],
	declarations: [],
	providers: [
		/* our own custom services  */
		{provide: LoggerService, useClass: ConsoleLoggerService},
		{provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
		{provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true}
	]
})
export class CoreModule {
	/* make sure CoreModule is imported only by one NgModule the AppModule */
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error(
				'CoreModule is already loaded. Import it in the AppModule only');
		}
	}

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CoreModule,
			providers: []
		};
	}
}
