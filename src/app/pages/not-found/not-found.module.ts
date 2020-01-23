import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotFoundPage } from '@app/pages/not-found/not-found.page';

const routes: Routes = [
	{
		path: '',
		component: NotFoundPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [NotFoundPage]
})
export class NotFoundPageModule {
}
