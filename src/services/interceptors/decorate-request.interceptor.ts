/**
 * This interceptor will add additional headers to the request
 *
 * Created January 17th, 2018
 * @author: ywarezk
 * @version: 0.0.1
 * @copyright: Nerdeez Ltd
 * @licence: MIT
 */

import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import * as urljoin from 'url-join';

interface ParamsOrHeaders<T> {
    get: (key: string) => string | null;
    set: (name: string, value: any) => T;
    keys: () => string[];
}

export class DecorateRequestInterceptor implements HttpInterceptor {
    constructor(private _headers: HttpHeaders, private _params: HttpParams, private _url?: string) {
    }

    private _merge<T extends ParamsOrHeaders<T>>(headersA: T, headersB: T): T {
        let result: T = headersA;
        const keys = headersB.keys();
        for (const key of keys) {
            result = result.set(key, headersB.get(key) as string);
        }
        return result;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newReqOptions: {[key: string]: any} = {
            headers: this._merge(req.headers, this._headers),
            params: this._merge(req.params, this._params)
        };
        if (this._url) {
            newReqOptions['url'] = urljoin(this._url, req.url);
        }
        const newReq = req.clone(newReqOptions);
        return next.handle(newReq);
    }
}

