import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
	},
	{
		path: '**',
		loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule),
		data: {title: 'Not found'}
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
