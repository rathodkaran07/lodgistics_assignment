import { Component } from '@angular/core';

@Component({
	selector: 'app-tabs',
	template: `
		<ion-tabs>
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="tab1">
					<ion-icon name="logo-angular"></ion-icon>
					<ion-label>Tab One</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="tab2">
					<ion-icon name="logo-ionic"></ion-icon>
					<ion-label>Tab Two</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	`,
	styles: []
})
export class TabsPage {

	constructor() {
	}

}
