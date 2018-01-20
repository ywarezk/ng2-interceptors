/**
 * decorating a request means to add additional headers
 * or add additional query param to the request
 *
 * Created January 18th, 2018
 * @author: ywarezk
 * @version: 0.0.1
 * @copyright: Nerdeez Ltd
 * @licence: MIT
 */

import {DecorateRequestInterceptor} from '../services/interceptors/decorate-request.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IOptionsCsrfModule, IOptionsInterceptorModule, IOptionsTokenAuthenticationModule} from '../interfaces/ioptions';

export const OPTIONS = new InjectionToken<IOptionsInterceptorModule>('OPTIONS');

export function initialize(options: IOptionsInterceptorModule): DecorateRequestInterceptor {
  let headers = options ? options.headers : new HttpHeaders();
  if (!(headers instanceof HttpHeaders)) {
    headers = new HttpHeaders(headers);
  }

  let params: HttpParams = new HttpParams();
  if (options && options.params instanceof HttpParams) {
    params = options.params;
  } else if (options && typeof options.params === 'string') {
    let tempParams: string;
    if (options.params[0] === '?') {
      tempParams = options.params.substr(1);
    } else {
      tempParams = options.params;
    }
    const tempParamsArray = tempParams.split('&');
    for (const keyValue of tempParamsArray) {
      const key = keyValue.split('=')[0];
      const val = keyValue.split('=')[1];
      params.set(key, val);
    }
  } else if (options && options.params) {
    for (const key of Object.keys(options.params)) {
      params = params.set(key, (<{[key: string]: string}>options.params)[key]);
    }
  }
  return new DecorateRequestInterceptor(headers, params, options ? options.url : undefined);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class DecorateRequestModule {
  static withOptions(options?: IOptionsInterceptorModule): ModuleWithProviders {
    return {
      ngModule: DecorateRequestModule,
      providers: [
          {provide: OPTIONS, useValue: options},
          {
            deps: [OPTIONS],
            provide: HTTP_INTERCEPTORS,
            useFactory: initialize,
            multi: true
          }
      ]
    };
  }
}
