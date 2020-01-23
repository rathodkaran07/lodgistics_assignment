import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1StateModule } from '@app/pages/tabs/tab1/state/tab1.state.module';
import { Tab1Service } from '@app/pages/tabs/tab1/tab1.service';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild([{path: '', component: Tab1Page}]),
		Tab1StateModule
	],
	providers: [Tab1Service],
	declarations: [Tab1Page]
})
export class Tab1PageModule {
}
