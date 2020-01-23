import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ToastService } from '@app/shared/services/toast.service';
import { LoggerService } from '@app/core/services/logger/logger.service';
import { ApiService } from '@app/shared/services/api.service';

@Injectable({providedIn: 'root'})
export class LogResponseInterceptor implements HttpInterceptor {
	constructor(private toastService: ToastService, private logger: LoggerService, private apiService: ApiService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const started = Date.now();
		let ok: string;

		return next.handle(req).pipe(
			tap((result: HttpEvent<any>) => {
					this.logger.info('After send interceptor ', result);
					ok = result instanceof HttpResponse ? 'succeeded' : '';
				},
				(error: HttpErrorResponse) => {
					this.logger.info('After send interceptor error => ', error);
					ok = 'failed';
					const msg = `ERROR: ${error.name} => ${error.statusText}`;
					this.toastService.show(msg, 'background-red');
				}),
			catchError((error: HttpErrorResponse) => {
				this.logger.info('After send interceptor error => ', error);
				const msg = `ERROR: ${error.name} => ${error.statusText}`;
				this.toastService.show(msg, 'background-red');
				return throwError(error);
			}),
			// Profilling
			finalize(() => {
				const elapsed = Date.now() - started;
				const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
				this.logger.info(msg);
			})
		);
	}
}
