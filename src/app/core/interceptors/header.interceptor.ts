import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { StorageService } from '@app/shared/services/storage.service';
import { LoggerService } from '@app/core/services/logger/logger.service';

@Injectable({providedIn: 'root'})
export class HeaderInterceptor implements HttpInterceptor {
	constructor(private storageService: StorageService, private logger: LoggerService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!req.headers.has('Content-Type')) {
			req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
		}

		req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
		this.logger.info('Before send interceptor ', req);
		return next.handle(req);
	}
}
