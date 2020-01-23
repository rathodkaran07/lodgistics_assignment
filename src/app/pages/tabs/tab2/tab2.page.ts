import { Component } from '@angular/core';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: []
})
export class Tab2Page {
	toggleValue;

	constructor() {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		this.toggleValue = prefersDark.matches;
	}

	toggleDarkTheme(ev) {
		document.body.classList.toggle('dark', ev.detail.checked);
	}

}
