import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { map } from "rxjs";

export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    // Check if the request starts with '/'
    if (req.url.startsWith('/')) {
        // Modify the request URL by prepending it with the api
        if (environment.isMock) {
            const convertedUrl = req.url.replace(/\//g, '_');
            req = req.clone({url: environment.apiBase + convertedUrl + '.json'});
        } else {
            req = req.clone({url: environment.apiBase + req.url});
        }
        
    }
    
    return next(req).pipe(
        map((data) => {
            // For POST requests return the model with a generated id
            if (data instanceof HttpResponse && req.method === 'POST') {
                const model = req.body as Record<string, unknown>;
                if (!model) return data;
                
                model['id'] = Date.now();
                return new HttpResponse({body: model})
            }
            
            return data;
        })
    )
};
