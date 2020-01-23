import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPage } from '@app/pages/tabs/tabs.page';

import { TabsPageRoutingModule } from '@app/pages/tabs/tabs-routing.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		TabsPageRoutingModule
	],
	declarations: [TabsPage]
})
export class TabsPageModule {
}
