/**
 * this file contain token i can later inject to my interceptors
 *
 * Created January 17th, 2018
 * @author: ywarezk
 * @version: 0.0.1
 * @copyright: Nerdeez Ltd
 * @licence: MIT
 */

import {InjectionToken} from "@angular/core";
import {HttpHeaders, HttpParams} from "@angular/common/http";

export const HEADERS = new InjectionToken<HttpHeaders>('HEADERS');
export const PARAMS = new InjectionToken<HttpParams>('PARAMS');
export const TOKEN = new InjectionToken<string>('TOKEN');