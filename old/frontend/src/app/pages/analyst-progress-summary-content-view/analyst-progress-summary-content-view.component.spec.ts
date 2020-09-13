import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystProgressSummaryContentViewComponent } from './analyst-progress-summary-content-view.component';

describe('AnalystProgressSummaryContentViewComponent', () => {
  let component: AnalystProgressSummaryContentViewComponent;
  let fixture: ComponentFixture<AnalystProgressSummaryContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystProgressSummaryContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystProgressSummaryContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
