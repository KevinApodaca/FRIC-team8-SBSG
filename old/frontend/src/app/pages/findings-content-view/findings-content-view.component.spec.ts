import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsContentViewComponent } from './findings-content-view.component';

describe('FindingsContentViewComponent', () => {
  let component: FindingsContentViewComponent;
  let fixture: ComponentFixture<FindingsContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingsContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingsContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
