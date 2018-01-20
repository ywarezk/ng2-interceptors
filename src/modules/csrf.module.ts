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

import {NgModule, ModuleWithProviders, InjectionToken} from '@angular/core';
import {IOptionsCsrfModule} from '../interfaces/ioptions';
import {CommonModule} from '@angular/common';
import {HttpHeaders, HttpParams, HTTP_INTERCEPTORS} from '@angular/common/http';
import * as Cookies from '../utils/cookies';
import {DecorateRequestInterceptor} from '../services/interceptors/decorate-request.interceptor';

export const OPTIONS = new InjectionToken<IOptionsCsrfModule>('OPTIONS');

export function initialize(options: IOptionsCsrfModule): DecorateRequestInterceptor {
    const headers: {[key: string]: any} = {};
    if (typeof window !== 'undefined') {
        headers[options.headerName ?  options.headerName : 'X-XSRF-TOKEN'] = Cookies.get(options.cookieName ?  options.cookieName : 'XSRF-TOKEN');
    }
    return new DecorateRequestInterceptor(new HttpHeaders(headers), new HttpParams())
}

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
        return {
            ngModule: CsrfModule,
            providers: [
                {provide: OPTIONS, useValue: options},
                {
                    provide: HTTP_INTERCEPTORS,
                    deps: [OPTIONS],
                    useFactory: initialize,
                    multi: true
                }
            ]
        };
    }
}
