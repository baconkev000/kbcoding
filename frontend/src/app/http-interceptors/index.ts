import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

import APIInterceptor from "./api";
//import AuthInterceptor from "./auth";

export const httpInterceptorProviders = [
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    //{ provide: "BASE_API_URL", useValue: environment.apiUrl },
  ];