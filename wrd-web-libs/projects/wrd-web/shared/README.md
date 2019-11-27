# WRD Web Shared

The intention of this library is to provide application-wide singleton services.
Therefore this library must be imported in the `AppModule` of the CL only and
shared via `extra-webpack.config.js` as follows (see `/@wrd-web\/shared/`):
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        use:
          [{
            loader: 'share-loader',
            options: {
                modules: [/@angular/,/@clr\/angular/,/@clr\/ui/,/rxjs/,/@ngxs\/store/,/@ngxs-labs\/emitter/,/@wrd-web\/shared/],
                exclude: [/@angular-devkit/],
                namespace: 'lucy-web-app'
            }
          }]
      }]
  }
};
```

## Event Bus

Basic idea:
```
private bus$ = new Subject<Event>();

public publish<T extends Event>(event: T): void {
  if (event) {
    this.bus$.next(event);
  }
}

public of<T extends Event>(channel: string, eventName?: string): Observable<T> {
  return eventName
    ? this.bus$.pipe(filter((e: T) => e.channel === channel && e.name === eventName))
    : this.bus$.pipe(filter((e: T) => e.channel === channel));
}
```


The event bus is written in [RxJs](https://github.com/ReactiveX/rxjs) and provides pub/sub functionality.
```
  publish<T extends Event>(channel: string, event: T): void;

  of<T extends Event>(channel: string, eventName?: string): Observable<T>;
```

Injected via injection token: `@Inject(EVENT_BUS_SERVICE) private eventBus: EventBusInterface`


