import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Event } from '../api/events/event';
import { EVENT_BUS_SERVICE } from '../api/i-event-bus.service';
import { EventBusService } from './event-bus.service';
import { configureTestSuite } from 'ng-bullet';

class RegisterEvent extends Event {
  constructor(payload: RegisterEventPayload) {
    super();
    this.name = 'register';
    this.payload = payload;
  }
}

class RegisterEventPayload {
  constructor(private readonly name) {}
}

class InitializeEvent extends Event {
  constructor(channel: string, payload: InitializeEventPayload) {
    super();
    this.name = 'initialize';
    this.payload = payload;
  }
}

class InitializeEventPayload {
  data: any;
}

describe('EventBus', () => {
  let sut: EventBusService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: EVENT_BUS_SERVICE, useClass: EventBusService }]
    });
  });

  it('should be created', () => {
    sut = TestBed.get(EVENT_BUS_SERVICE);
    expect(sut).toBeTruthy();
  });

  describe('Error cases', () => {
    it('should not publish when channel is null', fakeAsync(() => {
      const getOrCreateChannelSpy = jest.spyOn(sut as any, 'getOrCreateChannel');

      sut.publish<RegisterEvent>(null, new RegisterEvent(new RegisterEventPayload('MF XY')));
      tick(100);

      expect(getOrCreateChannelSpy).not.toHaveBeenCalled();
    }));

    it('should not publish when event is null', fakeAsync(() => {
      const getOrCreateChannelSpy = jest.spyOn(sut as any, 'getOrCreateChannel');

      sut.publish<RegisterEvent>('asf', null);
      tick(100);

      expect(getOrCreateChannelSpy).not.toHaveBeenCalled();
    }));

    it('should not receive any event when channel is null', fakeAsync(() => {
      const getOrCreateChannelSpy = jest.spyOn(sut as any, 'getOrCreateChannel');

      sut.of<RegisterEvent>(null);
      tick(100);

      expect(getOrCreateChannelSpy).not.toHaveBeenCalled();
    }));
  });

  describe('MF registers at CL', () => {
    it('CL should receive RegisterEvent by channel', fakeAsync(() => {
      let receivedEvent: any = {};
      sut.of<RegisterEvent>('CL').subscribe((e: any) => (receivedEvent = e));

      sut.publish<RegisterEvent>('CL', new RegisterEvent(new RegisterEventPayload('MF XY')));
      tick(100);

      expect(receivedEvent.payload.name).toEqual('MF XY');
    }));

    it('CL should receive RegisterEvent by channel and event name', fakeAsync(() => {
      let receivedEvent: RegisterEvent = {} as RegisterEvent;
      sut.of<RegisterEvent>('CL', 'register').subscribe((e: RegisterEvent) => (receivedEvent = e));

      sut.publish<RegisterEvent>('CL', new RegisterEvent(new RegisterEventPayload('MF XY')));
      tick(100);

      expect(receivedEvent.payload.name).toEqual('MF XY');
    }));
  });

  describe('ngOnDestroy', () => {
    it('should free all resources ', () => {
      (sut as any).channels.clear();

      sut.of<RegisterEvent>('1', 'register');
      sut.of<RegisterEvent>('2', 'register');
      sut.of<RegisterEvent>('3', 'register');

      expect((sut as any).channels.size).toEqual(3);

      sut.ngOnDestroy();

      expect((sut as any).channels).toBeNull();
    });

    it('should free all resources ', () => {
      (sut as any).channels = null;

      try {
        sut.ngOnDestroy();
      } catch (e) {
        expect(true).toBe(false); // shall never come here
      }

      expect((sut as any).channels).toBeNull();
    });
  });
});
