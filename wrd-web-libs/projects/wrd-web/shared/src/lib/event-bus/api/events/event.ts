/**
 * Abstract base class for all events
 */
export abstract class Event {
  /** name of the event */
  name: string;

  /** optional payload of the event */
  payload?: any;
}
