import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavigationService } from './navigation.service';
import { configureTestSuite } from 'ng-bullet';

@Component({
  selector: 'app-dummy-routable-component',
  template: '<div>dummy</div>'
})
export class DummyRoutableComponent {}

describe('NavigationService', () => {
  let router: Router;
  let location: Location;
  let service: NavigationService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'root-context/micro-frontend-a/some-page', component: DummyRoutableComponent },
          { path: 'root-context/micro-frontend-a/some-other-page', component: DummyRoutableComponent },

          { path: 'root-context/micro-frontend-b/some-page', component: DummyRoutableComponent },
          { path: 'root-context/micro-frontend-b/some-other-page', component: DummyRoutableComponent }
        ])
      ],
      declarations: [DummyRoutableComponent],
      providers: [NavigationService]
    });
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    service = TestBed.get(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('navigate', () => {
    it('should navigate to "micro-frontend-b/some-page"', fakeAsync(() => {
      const destination = 'root-context/micro-frontend-b/some-page';
      const routerSpy = jest.spyOn(router, 'navigate');

      service.navigate(destination);

      tick(100);

      expect(routerSpy).toHaveBeenCalledWith([destination], undefined);
      expect(location.path()).toEqual(`/${destination}`);
    }));

    it('should navigate to "micro-frontend-b/some-page" with extras', fakeAsync(() => {
      const destination = 'root-context/micro-frontend-b/some-page';
      const extras: NavigationExtras = { queryParams: { key: 'value' } };
      const routerSpy = jest.spyOn(router, 'navigate');

      service.navigate(destination, extras);

      tick(100);

      expect(routerSpy).toHaveBeenCalledWith([destination], extras);
      expect(location.path()).toEqual(`/${destination}?key=value`);
    }));
  });

  describe('navigateInContext', () => {
    const initialParentPage = 'root-context/micro-frontend-a';
    const initialPage = `${initialParentPage}/some-page`;

    beforeEach(fakeAsync(() => {
      service.navigate(initialPage);

      tick(100);
    }));

    it('should be on "micro-frontend-a/some-page"', fakeAsync(() => {
      expect(location.path()).toEqual(`/${initialPage}`);
    }));

    it('should navigate from "micro-frontend-a/some-page" -> "micro-frontend-a/some-other-page"', fakeAsync(() => {
      const destination = 'some-other-page';
      const routerSpy = jest.spyOn(router, 'navigate');

      service.navigateInContext(destination);

      tick(100);

      expect(routerSpy).toHaveBeenCalledWith([`/${initialParentPage}/${destination}`], { relativeTo: TestBed.get(ActivatedRoute) });
      expect(location.path()).toEqual(`/${initialParentPage}/${destination}`);
    }));

    it('should navigate from "micro-frontend-a/some-page" -> "micro-frontend-a/some-other-page"', fakeAsync(() => {
      const destination = '/some-other-page'; // <---- added '/' in the beginning
      const routerSpy = jest.spyOn(router, 'navigate');

      service.navigateInContext(destination);

      tick(100);

      expect(routerSpy).toHaveBeenCalledWith([`/${initialParentPage}${destination}`], { relativeTo: TestBed.get(ActivatedRoute) });
      expect(location.path()).toEqual(`/${initialParentPage}${destination}`);
    }));

    it('should navigate from "micro-frontend-a/some-page" -> "micro-frontend-a/some-other-page" with extras', fakeAsync(() => {
      const destination = 'some-other-page';
      const extras: NavigationExtras = { queryParams: { key: 'value' } };
      const routerSpy = jest.spyOn(router, 'navigate');

      service.navigateInContext(destination, extras);

      tick(100);

      expect(routerSpy).toHaveBeenCalledWith([`/${initialParentPage}/${destination}`], {
        queryParams: { key: 'value' },
        relativeTo: TestBed.get(ActivatedRoute)
      });
      expect(location.path()).toEqual(`/${initialParentPage}/${destination}?key=value`);
    }));
  });
});
