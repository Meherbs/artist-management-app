import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeFormComponent } from './representative-form.component';

describe('RepresentativeFormComponent', () => {
  let component: RepresentativeFormComponent;
  let fixture: ComponentFixture<RepresentativeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentativeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
