import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksContentViewComponent } from './tasks-content-view.component';

describe('TasksContentViewComponent', () => {
  let component: TasksContentViewComponent;
  let fixture: ComponentFixture<TasksContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
