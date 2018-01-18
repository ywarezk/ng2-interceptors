/**
 * test for my modules
 * will try and create a module that includes all my modules and test
 * the interceptors are working
 *
 * Created January 18th, 2018
 * @author: ywarezk
 * @version: 0.0.1
 * @copyright: Nerdeez Ltd
 * @licence: MIT
 */

import {TestBed, inject} from "@angular/core/testing";
import {CsrfModule} from "./csrf.module";
import {TokenAuthenticationModule} from "./token-authentication.module";
import {DecorateRequestModule} from "./decorate-request.module";
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from "@angular/common/http";
import {AddHeadersInterceptor} from "./services/interceptors/add-headers.interceptor";
import * as Cookies from 'js-cookie';

describe('Modules', () => {
    let httpClient: HttpClient;
    let addHeaderInterceptor: AddHeadersInterceptor;

    localStorage.setItem('token', 'hello world');
    Cookies.set('XSRF-TOKEN', 'wat');

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CsrfModule.withOptions(),
                TokenAuthenticationModule.withOptions(),
                DecorateRequestModule.withOptions({
                    'headers': {'foo': 'bar'}
                }),
                HttpClientTestingModule
            ]
        });
    });

    beforeEach(inject([HttpClient, AddHeadersInterceptor], (client: HttpClient, interceptor: AddHeadersInterceptor) => {
        httpClient = client;
        addHeaderInterceptor = interceptor;
    }));

    it('make sure the interceptor is called for each of our modules', (done) => {
        spyOn(addHeaderInterceptor, 'intercept');
        httpClient.get('https://www.google.com').subscribe(() => {
            expect(addHeaderInterceptor.intercept).toHaveBeenCalledTimes(3);
            done();
        });
    });
})