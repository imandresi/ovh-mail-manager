import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.authorizationToken;

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        authService.parseHttpResponse(authReq.url, event);
      }
    })
  );
};
