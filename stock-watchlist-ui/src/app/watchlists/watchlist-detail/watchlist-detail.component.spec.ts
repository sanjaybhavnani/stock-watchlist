import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistDetailComponent } from './watchlist-detail.component';

describe('CreateWatchlistComponent', () => {
  let component: WatchlistDetailComponent;
  let fixture: ComponentFixture<WatchlistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
