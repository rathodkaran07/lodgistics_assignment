import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
	ActionSheetController,
	AlertController,
	MenuController,
	ModalController,
	Platform,
	PopoverController
} from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// State
import { select, Store } from '@ngrx/store';
import { AppState, selectRouteData } from './state/app.reducer';
import * as fromUtil from '@app/state/util/util.reducer';
import { UtilActions } from '@app/state/util';

@Component({
	selector: 'app-root',
	template: `
		<ion-app>
			<ion-router-outlet></ion-router-outlet>
		</ion-app>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private actionSheetCtrl: ActionSheetController,
		private popoverCtrl: PopoverController,
		private modalCtrl: ModalController,
		private menuCtrl: MenuController,
		private alertCtrl: AlertController,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private store: Store<AppState & fromUtil.UtilState>
	) {
		// Use matchMedia to check the user preference
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		toggleDarkTheme(prefersDark.matches);
		// Listen for changes to the prefers-color-scheme media query
		prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

		// Add or remove the "dark" class based on if the media query matches
		function toggleDarkTheme(shouldAdd) {
			document.body.classList.toggle('dark', shouldAdd);
		}
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.store.dispatch(UtilActions.appReady());
			this.store.pipe(select(fromUtil.getStorageReady));
			if (this.platform.is('android') && !this.platform.is('mobileweb')) {
				this.statusBar.styleDefault();
				this.splashScreen.hide();
			}

			this.platform.backButton.subscribe(async () => {
				console.log('Hit Back');
				// close action sheet
				try {
					const element = await this.actionSheetCtrl.getTop();
					if (element) {
						await element.dismiss();
						return;
					}
				} catch (error) {
					console.log(error);
				}

				// close popover
				try {
					const element = await this.popoverCtrl.getTop();
					if (element) {
						await element.dismiss();
						return;
					}
				} catch (error) {
					console.log(error);
				}

				// close modal
				try {
					const element = await this.modalCtrl.getTop();
					if (element) {
						await element.dismiss();
						return;
					}
				} catch (error) {
					console.log(error);
				}

				// close side menu
				try {
					const element = await this.menuCtrl.getOpen();
					if (element) {
						await this.menuCtrl.close();
						return;
					}
				} catch (error) {
					console.log(error);
				}

				// exit app
				const alert = await this.alertCtrl.create({
					header: 'Close app?',
					buttons: [{text: 'Cancel', role: 'cancel'}, {
						text: 'Close',
						handler: () => {
							navigator['app'].exitApp();
						}
					}]
				});
				await alert.present();
			});
		});
	}
}
