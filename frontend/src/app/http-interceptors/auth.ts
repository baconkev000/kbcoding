// import { AuthService } from '../services/auth/auth.service';
// import { Injectable } from '@angular/core';
// import { Inject } from '@angular/core';
// import {
//   HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
// } from '@angular/common/http';

// import { Observable } from 'rxjs';

// @Injectable()
// export default class AuthInterceptor implements HttpInterceptor {

//     constructor(
//         private auth: AuthService,
//         @Inject('BASE_API_URL') private baseUrl: string) {
//     }

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const token = this.auth.getAuthToken(req.url, req.body).subscribe((token: string) => {
//       });
//     const tempToken = "String";
//     const authReq = req.clone({ setHeaders: { Authorization: tempToken} });

//     // Clone the request and replace the original headers with
//     // cloned headers, updated with the authorization.

//     // send cloned request with header to the next handler.
//     return next.handle(authReq);
//   }
// }