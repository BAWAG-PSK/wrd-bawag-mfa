import { Event } from '../event';

/**
 * Sent after the MF gets instantiated.
 */
export class RegisterEvent extends Event {
  /** name of the event */
  public static NAME = '[GLOBAL EVENT] REGISTER';

  /** constructor */
  constructor(payload: RegisterEventPayload) {
    super();
    this.name = RegisterEvent.NAME;
    this.payload = payload;
  }
}

/**
 * Payload of the register event
 */
export class RegisterEventPayload {
  /** constructor */
  constructor(private _mfId: string) {}

  /** getter for the ID of the MF */
  get mfId(): string {
    return this._mfId;
  }
}
