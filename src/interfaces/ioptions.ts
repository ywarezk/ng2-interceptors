/**
 * Contains the interface of the options we can pass the InterceptorModule
 *
 * Created January 17th, 2018
 * @author: ywarezk
 * @version: 0.0.1
 * @copyright: Nerdeez Ltd
 * @licence: MIT
 */

import {HttpHeaders, HttpParams} from '@angular/common/http';

export enum TokenStorages {
    localStorage,
    sessionStorage,
    cookies
}

/**
 * these are the options you can pass to the InterceptorModule
 */
export interface IOptionsInterceptorModule {
    headers?: HttpHeaders | {[key: string]: string | string[]} | string;
    params?: HttpParams | {[key: string]: string} | string;
    url?: string;
}

/**
 * these are the options you can pass to the authentication module
 */
export interface IOptionsTokenAuthenticationModule {
    tokenStoredIn?: TokenStorages; // default to localStorage
    tokenKeyName?: string; // default 'token'
    tokenHeader?: string; // default 'Authorization'
    tokenHeaderPrefix?: string; // the prefix string to append the token to default: 'Token '
}

/**
 * options interface for the csrf module
 */
export interface IOptionsCsrfModule {
    cookieName?: string; // default is: 'XSRF-TOKEN'
    headerName?: string; // default is: 'X-XSRF-TOKEN'
}
