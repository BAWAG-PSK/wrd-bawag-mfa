import { TestBed } from '@angular/core/testing';
import { RefreshResolverService } from '@app/core/resolver/refresh/refresh-resolver.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TEST_PROVIDER } from '@app/core/test-provider';

describe('RefreshService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [...TEST_PROVIDER, RefreshResolverService]
    })
  );

  it('should be created', () => {
    const service: RefreshResolverService = TestBed.get(RefreshResolverService);
    expect(service).toBeTruthy();
  });
});
