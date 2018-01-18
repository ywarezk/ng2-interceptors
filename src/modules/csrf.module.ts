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

import {NgModule} from '@angular/core';
import {IOptionsCsrfModule} from "./interfaces/ioptions";
import {CommonModule} from "@angular/common";
import {DecorateRequestModule} from "./decorate-request.module";
import {HttpHeaders} from "@angular/common/http";
import * as Cookies from 'js-cookie';

@NgModule({
})
export class CsrfModule {
    static withOptions(options: IOptionsCsrfModule = {
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
    }) {
        const headers = {};
        headers[options.headerName] = Cookies.get(options.cookieName);

        @NgModule({
            imports: [
                CommonModule,
                DecorateRequestModule.withOptions({
                    headers: new HttpHeaders(headers)
                })
            ]
        })
        class DynamicModule {
        }
        return DynamicModule;
    }
}