import { Injectable } from '@angular/core';

import { Logger } from '@app/core/services/logger/logger';

@Injectable({providedIn: 'root'})
export class LoggerService implements Logger {
	public info: any;
	public warn: any;
	public error: any;
}
