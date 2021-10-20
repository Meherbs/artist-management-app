import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionsFormComponent } from './connections-form.component';

describe('ConnectionsFormComponent', () => {
  let component: ConnectionsFormComponent;
  let fixture: ComponentFixture<ConnectionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
