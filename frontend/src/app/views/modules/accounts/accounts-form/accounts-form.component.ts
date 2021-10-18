import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { User } from 'src/app/Models/User';
import { RoleAccount, AccountLibrary } from 'src/app/Models/role-account';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-accounts-form',
  templateUrl: './accounts-form.component.html',
  styleUrls: ['./accounts-form.component.css']
})
export class AccountsFormComponent implements OnInit {

  form: FormGroup;
  private accountValue: User;
  rolesList: RoleAccount[];

  @Input()
  set account(value: User) {
    if (value) {
      this.accountValue = value;
      //this.selectedPersonIndex = this.getPersonIndex();
      setTimeout(() => {
        this.form.patchValue(this.accountValue);
        this.initializeSelectedRole();
      }, 100);
    }
  }
  get account() { return this.accountValue }

  @Output() onSave: EventEmitter<User> = new EventEmitter();
  @Output() onCancellation: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: UserService,
    private datepipe: DatePipe,
    private formbuilder: FormBuilder
  ) {
    this.rolesList = AccountLibrary.getAvailableRoles();
    this.form = formbuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
      ),
      roles: new FormControl(null, Validators.required)
    });
  }

  private initializeSelectedRole(): void {
    if (Array.isArray(this.rolesList) && this.account) {
      if (this.account.roles) {
        let roleField: any = this.form.get('roles');
        roleField.setValue(AccountLibrary.findRoleByData(this.rolesList, this.account.roles));
      }
    }
  }

  ngOnInit(): void {

  }

  save() {
    if (this.form.valid) {
      const data: User = this.form.getRawValue();
      let roleVal: any = this.form.get('roles');
      data.roles = AccountLibrary.findRoleDataByKey(roleVal.value);
      if (this.account) {
        this.service
          .update(this.account.id, data)
          .subscribe((res: User) => this.onSave.emit(res))
          ;
      } else {
        this.service
          .create(data)
          .subscribe((res: User) => this.onSave.emit(res))
          ;
      }
    }
  }

  cancel() { this.onCancellation.emit(null); }

}


