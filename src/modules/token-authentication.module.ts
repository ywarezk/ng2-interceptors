/**
 * This module is used to attach an Authorization header to the request
 *
 * Created January 18th, 2018
 * @author: ywarezk
 * @version: 0.0.1
 * @copyright: Nerdeez Ltd
 * @licence: MIT
 */

import * as Cookies from "js-cookie";
import {IOptionsTokenAuthenticationModule, TokenStorages} from "./interfaces/ioptions";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpHeaders} from "@angular/common/http";
import {DecorateRequestModule} from "./decorate-request.module";

@NgModule({
})
export class TokenAuthenticationModule {
  static withOptions(options: IOptionsTokenAuthenticationModule = {
    tokenStoredIn: TokenStorages.localStorage,
    tokenKeyName: 'token',
    tokenHeader: 'Authorization',
    tokenHeaderPrefix: 'Token '
  }) {
    let token: string = '';
    switch (options.tokenStoredIn) {
        case TokenStorages.localStorage:
            token = localStorage ? localStorage.getItem(options.tokenKeyName) : '';
            break;
        case TokenStorages.sessionStorage:
            token = sessionStorage ? sessionStorage.getItem(options.tokenKeyName) : '';
            break;
        case TokenStorages.cookies:
            token = Cookies ? Cookies.get(options.tokenKeyName) : '';
        default:
            token = '';
    }
    const moduleOptions = {};
    moduleOptions[options.tokenHeader] = options.tokenHeaderPrefix + token;
    @NgModule({
        imports: [
            CommonModule,
            DecorateRequestModule.withOptions({
                headers: new HttpHeaders(moduleOptions)
            })
        ]
    })
    class DynamicModule {}
    return DynamicModule;
  }
}
