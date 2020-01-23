import { Component, OnInit, ViewChildren } from '@angular/core';
import { ModalController, IonItemSliding } from '@ionic/angular';

import { select, Store } from '@ngrx/store';
import { AppState, selectRouteData } from '@app/state/app.reducer';
import { Tab1Actions } from '@app/pages/tabs/tab1/state';
import * as fromTab1 from '@app/pages/tabs/tab1/state/tab1.reducer';

import { Tab1Service } from '@app/pages/tabs/tab1/tab1.service';
import { ToastService } from '@app/shared/services';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Employee } from '@app/shared/models';
import { DetailsModalComponent } from '@app/shared/component/modal/details.modal.component';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
	title$: Observable<string>;
	isLoading$: Observable<boolean>;
	data$: Observable<Employee[] | null>;

	@ViewChildren(IonItemSliding) slidingItem: IonItemSliding[];
	isItemOpened = false;

	// tslint:disable-next-line:max-line-length
	constructor(private tab1Service: Tab1Service, private modalController: ModalController, private toastService: ToastService, private store: Store<AppState>) {
		this.title$ = store.pipe(select(selectRouteData)) as Observable<any> as Observable<string>;
	}

	ngOnInit(): void {
		/*this.tab1Service.getAllEmployees().subscribe((data) => {
			console.log(data);
		});*/
		this.isLoading$ = this.store.select(fromTab1.getIsLoading);
		this.store.select(fromTab1.getError).subscribe(error => {
			if (error) {
				this.toastService.show('Something went wrong', 'background-red');
			}
		});
		this.data$ = this.store.select(fromTab1.getData).pipe(
			tap(data => console.log(data))
		);

		this.store.dispatch(Tab1Actions.getEmployee());
	}

	itemOpened(ev) {
		this.isItemOpened = true;
	}

	async edit(employee: Employee) {
		console.log(this.slidingItem);
		if (this.isItemOpened) {
			this.isItemOpened = false;
			return;
		}

		const modal = await this.modalController.create({
			component: DetailsModalComponent,
			cssClass: 'details-modal',
			backdropDismiss: false,
			keyboardClose: false,
			componentProps: {employee}
		});
		modal.onDidDismiss().then((result) => {
			console.log(result);
			this.store.dispatch(Tab1Actions.updateEmployeeImage({id: employee.id, imageData: result.data}));
		});
		return await modal.present();
	}

	delete(id) {
		this.store.dispatch(Tab1Actions.deleteEmployee({id}));
	}
}
