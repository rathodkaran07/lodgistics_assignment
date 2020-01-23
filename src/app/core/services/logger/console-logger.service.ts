import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { Logger } from '@app/core/services/logger/logger';

export let isDebugMode = !environment.production;

const noop = (): any => undefined;

@Injectable()
export class ConsoleLoggerService implements Logger {

	get info() {
		if (isDebugMode) {
			// tslint:disable-next-line:no-console
			return console.info.bind(console);
		} else {
			return noop;
		}
	}

	get warn() {
		if (isDebugMode) {
			return console.warn.bind(console);
		} else {
			return noop;
		}
	}

	get error() {
		if (isDebugMode) {
			return console.error.bind(console);
		} else {
			return noop;
		}
	}

}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
// https://github.com/Microsoft/TypeScript/wiki/%27this%27-in-TypeScript#functionbind
// https://github.com/Raynos/function-bind/blob/master/implementation.js
