import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicitesComponent } from './publicites.component';

describe('PublicitesComponent', () => {
  let component: PublicitesComponent;
  let fixture: ComponentFixture<PublicitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
