import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { CoreModule } from '@app/core';
import { AppStateModule } from '@app/state/app.state.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { SharedModule } from '@app/shared';

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		IonicStorageModule.forRoot({
			name: '__mydb',
			driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
		}),
		CoreModule.forRoot(),
		SharedModule,
		AppStateModule.forRoot(),
		AppRoutingModule
	],
	providers: [
		Camera,
		File,
		FilePath,
		StatusBar,
		SplashScreen,
		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
