import { Router } from '@angular/router';
import { Injector } from '@angular/core';

/**
 * Singleton that hides the Root-@link{Injector} instance and provides it to classes that have no access to it, because
 * it is e.g. a utils class and not a service or component.
 */
export class GlobalInjector {
  /** the private instance */
  private static _instance: Injector;

  /** private constructor */
  private constructor() {}

  /**
   * Used to initialize the GlobalInjector by setting the root injector.
   *
   * @param injector The root injector
   */
  public static init(injector: Injector) {
    if (GlobalInjector._instance === undefined) {
      GlobalInjector._instance = injector;
    }
  }

  /**
   * Returns the root injector
   */
  public static getInjector(): Injector {
    return GlobalInjector._instance;
  }
}

/**
 * Use this ONLY when there is NO INJECTOR in your Component/Service/Directive/Pipe/... available!
 */
export function getRouter(): Router {
  return GlobalInjector.getInjector().get<Router>(Router);
}
