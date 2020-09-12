import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupContentViewComponent } from './setup-content-view.component';

describe('SetupContentViewComponent', () => {
  let component: SetupContentViewComponent;
  let fixture: ComponentFixture<SetupContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
