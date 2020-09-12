import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsContentViewComponent } from './systems-content-view.component';

describe('SystemsContentViewComponent', () => {
  let component: SystemsContentViewComponent;
  let fixture: ComponentFixture<SystemsContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemsContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
