import { Event } from '../event';

/**
 * Sent before the MF gets destroyed.
 */
export class DestroyEvent extends Event {
  /** name of the event */
  public static NAME = '[GLOBAL EVENT] DESTROY';

  /** constructor */
  constructor() {
    super();
    this.name = DestroyEvent.NAME;
  }
}
