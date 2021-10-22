import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IRepresentative } from 'src/app/Models/presentative';
import { RepresentativeService } from 'src/app/services/app-services/representative.service';
import { IEmailAdress } from 'src/app/Models/emailAdress';
import { async } from 'rxjs';

@Component({
  selector: 'app-representative-form',
  templateUrl: './representative-form.component.html',
  styleUrls: ['./representative-form.component.css']
})
export class RepresentativeFormComponent implements OnInit {

  form: FormGroup;
  formEmail: FormGroup;
  private _representative: IRepresentative;
  //newEmail = '';

  emailsList: IEmailAdress[];

  addNewEmail() {
    if (this.formEmail.valid && this.formEmail.controls.email.value !== null) {
      if (this.checkEmailExist()) {
        alert("You have already add this email adress");
      } else {
        this.emailsList.push({
          adress: this.formEmail.controls.email.value
        });
      }
    }
  }

  removeEmail(index: number) {
    this.emailsList.splice(index, 1);
  }

  @Input()
  set representative(value: IRepresentative) {
    if (value) {
      this._representative = value;
      setTimeout(() => {
        this.form.patchValue(this._representative);
        this.emailsList = this._representative.emails;
      }, 100);
    }
  }
  get representative() { return this._representative }

  @Output() onSave: EventEmitter<IRepresentative> = new EventEmitter();
  @Output() onCancellation: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: RepresentativeService,
    private datepipe: DatePipe,
    private formbuilder: FormBuilder
  ) {
    this.form = formbuilder.group({
      name: new FormControl(null, Validators.required),
      company: new FormControl(null, Validators.required),
      emails: new FormControl(null)
    });
    this.emailsList = []
  }

  checkEmailExist() {
    const email = this.formEmail.controls.email.value;
    const nb = (this.emailsList) ? this.emailsList.length : 0;
    for (let i = 0; i < nb; i++) {
      if (this.emailsList[i].adress == email) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.formEmail = this.formbuilder.group({
      email: new FormControl(null, [
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
    });
  }

  save() {
    if (this.form.valid) {
      const data: IRepresentative = this.form.getRawValue();
      data.emails = this.emailsList;
      if (this.representative) {
        this.service
          .update(this.representative.id, data)
          .subscribe((res: IRepresentative) => this.onSave.emit(res))
          ;
      } else {
        this.service
          .create(data)
          .subscribe((res: IRepresentative) => this.onSave.emit(res))
          ;
      }
    }
  }

  cancel() { this.onCancellation.emit(null); }

}
