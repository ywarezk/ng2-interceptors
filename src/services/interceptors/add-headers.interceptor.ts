/**
 * This interceptor will add additional headers to the request
 *
 * Created January 17th, 2018
 * @author: ywarezk
 * @version: 0.0.1
 * @copyright: Nerdeez Ltd
 * @licence: MIT
 */

import {Inject, Injectable} from "@angular/core";
import {HEADERS, PARAMS} from '../tokens.service';
import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AddHeadersInterceptor implements HttpInterceptor{
    constructor(@Inject(HEADERS) private _headers: HttpHeaders, @Inject(PARAMS) private _params: HttpParams) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newReq = req.clone({
            headers: this._headers,
            params: this._params
        });
        return next.handle(newReq);
    }
}