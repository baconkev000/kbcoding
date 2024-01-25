import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { ApiService } from '../services/api.service';

import { Observable } from 'rxjs';

@Injectable()
export default class APIInterceptor implements HttpInterceptor {
    constructor(
        private apiService: ApiService,
        @Inject('BASE_API_URL') private baseUrl: string) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const apiReq = req.clone({ url: `${this.baseUrl}/${req.url}` });
      return next.handle(apiReq);
    }
  }