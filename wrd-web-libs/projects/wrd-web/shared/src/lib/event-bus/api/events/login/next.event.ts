import { Event } from '../event';

/**
 * Sent after successful login.
 */
export class NextEvent extends Event {
  /** name of the event */
  public static NAME = '[LOGIN EVENT] NEXT';

  /** constructor */
  constructor() {
    super();
    this.name = NextEvent.NAME;
  }
}
