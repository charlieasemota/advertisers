import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from "../../environments/environment";

export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Check if the request starts with '/'
  if (req.url.startsWith('/')) {
    // Modify the request URL by prepending it with the api
    if (environment.isMock) {
      const convertedUrl = req.url.replace(/\//g, '_');
      req = req.clone({url: '/mocks/' + convertedUrl + '.json'});
    } else {
      req = req.clone({url: 'https://1ea1bea0-214d-4c02-8e97-d5e259ec08b2.mock.pstmn.io' + req.url});
    }
    
  }
  
  return next(req);
};
