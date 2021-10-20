import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICelebrity } from 'src/app/Models/celebrity';
import { EventEmitter } from '@angular/core';
import { CelebrityService } from 'src/app/services/app-services/celebrity.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-celebrity-form',
  templateUrl: './celebrity-form.component.html',
  styleUrls: ['./celebrity-form.component.css']
})
export class CelebrityFormComponent implements OnInit {

  form: FormGroup;
  private _celebrity: ICelebrity;

  @Input()
  set celebrity(value: ICelebrity) {
    if (value) {
      this._celebrity = value;
      setTimeout(() => {
        this.form.patchValue(this._celebrity);
        this.form.get('birthday').patchValue(this.formatDate(this._celebrity.birthday));
      }, 100);
    }
  }
  get celebrity() { return this._celebrity }

  @Output() onSave: EventEmitter<ICelebrity> = new EventEmitter();
  @Output() onCancellation: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: CelebrityService,
    private datepipe: DatePipe,
    private formbuilder: FormBuilder
  ) {
    this.form = formbuilder.group({
      name: new FormControl(null, Validators.required),
      bio: new FormControl(null, Validators.required),
      birthday: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {

  }

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  save() {
    if (this.form.valid) {
      const data: ICelebrity = this.form.getRawValue();
      if (this.celebrity) {
        this.service
          .update(this.celebrity.id, data)
          .subscribe((res: ICelebrity) => this.onSave.emit(res))
          ;
      } else {
        this.service
          .create(data)
          .subscribe((res: ICelebrity) => this.onSave.emit(res))
          ;
      }
    }
  }

  cancel() { this.onCancellation.emit(null); }

}
