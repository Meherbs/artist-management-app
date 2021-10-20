import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionsSaveComponent } from './connections-save.component';

describe('ConnectionsSaveComponent', () => {
  let component: ConnectionsSaveComponent;
  let fixture: ComponentFixture<ConnectionsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionsSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
