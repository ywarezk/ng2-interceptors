/**
 * CSRF interceptor
 * angular has a built in csrf interceptor but it will not work on get requests
 * it will also not work on absolute urls
 *
 * Created January 18th, 2018
 * @author: ywarezk
 * @version: 0.0.1
 * @copyright: Nerdeez Ltd
 */

import {NgModule, ModuleWithProviders} from '@angular/core';
import {IOptionsCsrfModule} from '../interfaces/ioptions';
import {CommonModule} from '@angular/common';
import {HttpHeaders, HttpParams, HTTP_INTERCEPTORS} from '@angular/common/http';
import * as Cookies from 'js-cookie';
import {DecorateRequestInterceptor} from '../services/interceptors/decorate-request.interceptor';

@NgModule({
    imports: [
        CommonModule
    ]
})
export class CsrfModule {
    static withOptions(options: IOptionsCsrfModule = {
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
    }): ModuleWithProviders {
        const headers: {[key: string]: any} = {};
        headers[options.headerName as string] = Cookies.get(options.cookieName as string);
        return {
            ngModule: CsrfModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useValue: new DecorateRequestInterceptor(new HttpHeaders(headers), new HttpParams()),
                    multi: true
                }
            ]
        };
    }
}