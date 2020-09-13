import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveContentViewComponent } from './archive-content-view.component';

describe('ArchiveContentViewComponent', () => {
  let component: ArchiveContentViewComponent;
  let fixture: ComponentFixture<ArchiveContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
