import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = sessionStorage.getItem('token');

  console.log('Request URL:', req.url);
  console.log('Token:', token);

  if (token) {

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(
      'Authorization:',
      authReq.headers.get('Authorization')
    );

    return next(authReq);
  }

  return next(req);
};