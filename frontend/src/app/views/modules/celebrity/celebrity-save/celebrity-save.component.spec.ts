import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebritySaveComponent } from './celebrity-save.component';

describe('CelebritySaveComponent', () => {
  let component: CelebritySaveComponent;
  let fixture: ComponentFixture<CelebritySaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelebritySaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebritySaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
