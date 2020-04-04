import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPublicitesComponent } from './admin-publicites.component';

describe('AdminPublicitesComponent', () => {
  let component: AdminPublicitesComponent;
  let fixture: ComponentFixture<AdminPublicitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPublicitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPublicitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
