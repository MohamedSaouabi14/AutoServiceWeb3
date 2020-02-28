import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollaborateursComponent } from './admin-collaborateurs.component';

describe('AdminCollaborateursComponent', () => {
  let component: AdminCollaborateursComponent;
  let fixture: ComponentFixture<AdminCollaborateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCollaborateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollaborateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
