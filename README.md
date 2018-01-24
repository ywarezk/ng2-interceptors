# nz-ng2-interceptors

![Build Status](https://jenkins.nerdeez.com/buildStatus/icon?job=ng-interceptors/dev-0.0.9)


## About

This package contains recommended interceptors to use in your app.

## Installation

```bash
npm install nz-ng2-interceptors --save
```

in your module add the interceptors you need

```typescript
@NgModule({
    imports: [
        CsrfModule.withOptions(),
        TokenAuthenticationModule.withOptions({
          tokenStoredIn: TokenStorages.cookies,
          tokenKeyName: environment.tokenCookieName
        }),
        DecorateRequestModule.withOptions({
          params: {format: 'json'},
          headers: {
            'Content-Type': 'application/json'
          },
          url: environment.serverUrl
        }),
    ]
})
```

## License
MIT
