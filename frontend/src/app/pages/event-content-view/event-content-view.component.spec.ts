import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventContentViewComponent } from './event-content-view.component';

describe('EventContentViewComponent', () => {
  let component: EventContentViewComponent;
  let fixture: ComponentFixture<EventContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
