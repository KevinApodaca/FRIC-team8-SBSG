import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtasksContentViewComponent } from './subtasks-content-view.component';

describe('SubtasksContentViewComponent', () => {
  let component: SubtasksContentViewComponent;
  let fixture: ComponentFixture<SubtasksContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtasksContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtasksContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
