import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsControlViewComponent } from './systems-control-view.component';

describe('SystemsControlViewComponent', () => {
  let component: SystemsControlViewComponent;
  let fixture: ComponentFixture<SystemsControlViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemsControlViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsControlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
