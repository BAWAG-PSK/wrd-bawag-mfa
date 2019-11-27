import { InjectionToken } from '@angular/core';
import { Event } from './events/event';
import { Observable } from 'rxjs';

/** Use this token to inject the event-bus service */
export const EVENT_BUS_SERVICE = new InjectionToken('event-bus-service');

/**
 * The event-bus interface
 */
export interface EventBusInterface {
  /**
   * Publish an {@link Event} on a specific `channel`
   * @param channel The channel (or "bus-lane")
   * @param event The {@link Event} to be published
   */
  publish<T extends Event>(channel: string, event: T): void;

  /**
   * Subscribe to a `channel` or combination of `channel` + `eventName`.
   * @param channel The channel (or "bus-lane")
   * @param eventName (optional) The name of the event
   */
  of<T extends Event>(channel: string, eventName?: string): Observable<T>;
}
