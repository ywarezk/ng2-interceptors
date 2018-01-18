/**
 * barrel file for the package
 *
 * Created January 18th, 2018
 * @author: ywarezk
 * @version: 0.0.1
 * @copyright: Nerdeez Ltd
 * @licence: MIT
 */

export {IOptionsInterceptorModule, IOptionsTokenAuthenticationModule, TokenStorages} from './interfaces/ioptions';
export {AddHeadersInterceptor} from './services/interceptors/add-headers.interceptor';
export {TokenAuthenticationModule} from './modules/token-authentication.module';
export {DecorateRequestModule} from './modules/decorate-request.module';



