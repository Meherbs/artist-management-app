import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsSaveComponent } from './accounts-save.component';

describe('AccountsSaveComponent', () => {
  let component: AccountsSaveComponent;
  let fixture: ComponentFixture<AccountsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
