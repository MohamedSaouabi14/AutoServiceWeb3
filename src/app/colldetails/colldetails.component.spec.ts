import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColldetailsComponent } from './colldetails.component';

describe('ColldetailsComponent', () => {
  let component: ColldetailsComponent;
  let fixture: ComponentFixture<ColldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
