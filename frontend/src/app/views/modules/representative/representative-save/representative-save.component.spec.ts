import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeSaveComponent } from './representative-save.component';

describe('RepresentativeSaveComponent', () => {
  let component: RepresentativeSaveComponent;
  let fixture: ComponentFixture<RepresentativeSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentativeSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativeSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
