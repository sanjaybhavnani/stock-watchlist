import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistLiveComponent } from './watchlist-live.component';

describe('WatchlistLiveComponent', () => {
  let component: WatchlistLiveComponent;
  let fixture: ComponentFixture<WatchlistLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistLiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
