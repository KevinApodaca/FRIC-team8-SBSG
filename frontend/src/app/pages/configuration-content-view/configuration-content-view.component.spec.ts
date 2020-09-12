import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationContentViewComponent } from './configuration-content-view.component';

describe('ConfigurationContentViewComponent', () => {
  let component: ConfigurationContentViewComponent;
  let fixture: ComponentFixture<ConfigurationContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
