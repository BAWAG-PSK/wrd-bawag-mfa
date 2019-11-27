import { TestBed } from '@angular/core/testing';

import { NgModule } from '@angular/core';
import { EventBusModule } from './event-bus.module';
import { EventBusService } from './internal/event-bus.service';
import { EVENT_BUS_SERVICE } from './api/i-event-bus.service';
import { configureTestSuite } from 'ng-bullet';

@NgModule({
  imports: [],
  exports: []
})
export class SomeOtherParentModule {}

describe('LoggingModule', () => {
  let sut: EventBusService;

  describe('Single Instantiation', () => {
    configureTestSuite(() => {
      TestBed.configureTestingModule({
        imports: [EventBusModule.forRoot()]
      });
    });

    beforeEach(() => {
      sut = TestBed.get(EVENT_BUS_SERVICE);
    });

    it('should create', () => {
      expect(sut).toBeDefined();
    });

    it('logger must be instanceof EventBusService', () => {
      expect(sut instanceof EventBusService).toBeTruthy();
    });

    afterAll(() => {
      sut = null;
    });
  });

  describe('Multiple Instantiation', () => {
    configureTestSuite(() => {
      TestBed.configureTestingModule({
        imports: [EventBusModule.forRoot(), SomeOtherParentModule]
      });
    });

    beforeEach(() => {
      sut = TestBed.get(EVENT_BUS_SERVICE);
    });

    it('should throw error due to multiple instantiation', () => {
      let exceptionThrown = false;
      let module = null;

      try {
        module = new EventBusModule(SomeOtherParentModule);
      } catch (e) {
        expect(module).toBeNull();
        expect(e.message).toEqual('EventBusModule is already loaded. Import it in the AppModule only');
        exceptionThrown = true;
      }

      expect(exceptionThrown).toBe(true);
    });

    afterAll(() => {
      sut = null;
    });
  });
});
