import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Event } from '../api/events/event';
import { EventBusInterface } from '../api/i-event-bus.service';

/**
 * Implementation of an application-"private" event bus. Meaning, only the CL + its MFs can use it.
 * In contrary to CustomEvent it is NOT exposed, which makes it secure to use because events cannot be spoofed or tampered with.
 *
 * The event bus supports multiple channels, each of them is a {@link Subject}.
 */
@Injectable()
export class EventBusService implements EventBusInterface, OnDestroy {
  /** channel -> subject */
  private channels: Map<string, Subject<Event>> = new Map<string, Subject<Event>>();

  /**
   * Publish an event
   * @param channel The name/id of the channel to be used
   * @param event The {@link Event} to be sent
   */
  public publish<T extends Event>(channel: string, event: T): void {
    if (!channel || !event) {
      return;
    }

    this.getOrCreateChannel(channel).next(event);
  }

  /**
   * Subscribe to a channel an possible even to only one specific event.
   * @param channel The channel to subscribe to
   * @param eventName The name of the event to subscribe to
   */
  public of<T extends Event>(channel: string, eventName?: string): Observable<T> {
    if (!channel) {
      return;
    }

    const channel$ = this.getOrCreateChannel(channel);

    return eventName ? channel$.pipe(filter((e: T) => e.name === eventName)) : (channel$.asObservable() as Observable<T>);
  }

  /**
   * Free resources. Unsubscribe from all subjects.
   */
  ngOnDestroy(): void {
    if (this.channels) {
      this.channels.forEach(v => v.unsubscribe());
      this.channels = null;
    }
  }

  /** returns (or creates) the subject for the channel */
  private getOrCreateChannel(channel: string): Subject<Event> {
    let channel$;

    if (!this.channels) {
      this.channels = new Map<string, Subject<Event>>();
    }

    if (!this.channels.has(channel)) {
      channel$ = new Subject<Event>();
      this.channels.set(channel, channel$);
    } else {
      channel$ = this.channels.get(channel);
    }

    return channel$;
  }
}
