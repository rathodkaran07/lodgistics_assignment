import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { select, Store } from '@ngrx/store';
import { AppState } from '@app/state/app.reducer';
import { UtilActions } from '@app/state/util';
import * as fromUtil from '@app/state/util/util.reducer';

@Injectable({providedIn: 'root'})
export class StorageService {
	constructor(private storage: Storage, private store: Store<AppState & fromUtil.UtilState>) {
		this.store.pipe(select(fromUtil.getAppReady)).subscribe(_ => {
			this.ready().then(data => {
				if (data) {
					this.store.dispatch(UtilActions.storageReady());
				}
			});
		});
	}

	ready() {
		return this.storage.ready();
	}

	get(key: string): Promise<any> {
		return this.storage.get(key);
	}

	set(key: string, value: any): Promise<any> {
		return this.storage.set(key, value);
	}

	remove(key: string): Promise<any> {
		return this.storage.remove(key);
	}

	clear(): Promise<any> {
		return this.storage.clear();
	}
}
