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

import {TestBed, inject} from '@angular/core/testing';
import {CsrfModule} from './csrf.module';
import {TokenAuthenticationModule} from './token-authentication.module';
import {DecorateRequestModule} from './decorate-request.module';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpRequest} from '@angular/common/http';
import * as Cookies from 'js-cookie';

describe('Modules', () => {

    localStorage.setItem('token', 'hello world');
    Cookies.set('XSRF-TOKEN', 'wat');

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                CsrfModule.withOptions(),
                TokenAuthenticationModule.withOptions(),
                DecorateRequestModule.withOptions({
                    headers: {'foo': 'bar'},
                    params: {format: 'json'}
                })
            ]
        });
    });

    it(
        'expects a GET request',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            http
                .get('/data')
                .subscribe();
            const req = httpMock.expectOne((request: HttpRequest<any>) => {
                return request.headers.get('Authorization') === 'Token hello world' &&
                    request.headers.get('X-XSRF-TOKEN') === 'wat' &&
                    request.headers.get('foo') === 'bar' &&
                    request.params.get('format') === 'json';
            });
            req.flush({});
            httpMock.verify();
        }));
});
