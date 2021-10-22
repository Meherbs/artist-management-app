import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IConnections } from 'src/app/Models/connections';
import { ICelebrity } from 'src/app/Models/celebrity';
import { ConnectionService } from 'src/app/services/app-services/connection.service';
import { RepresentativeService } from 'src/app/services/app-services/representative.service';
import { CelebrityService } from 'src/app/services/app-services/celebrity.service';
import { IRepresentative } from 'src/app/Models/presentative';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-connections-form',
  templateUrl: './connections-form.component.html',
  styleUrls: ['./connections-form.component.css']
})
export class ConnectionsFormComponent implements OnInit {

  form: FormGroup;
  private _connection: IConnections;
  celebrityList: ICelebrity[] = [];
  representativeList: IRepresentative[] = [];
  connectionString = '';

  @Input()
  set connection(value: IConnections) {
    if (value) {
      this._connection = value;
      setTimeout(() => {
        this.form.patchValue(this._connection);
        let role = this._connection.isAgent ? 1 : (this._connection.isPublicist ? 2 : 3);
        this.form.get('role').patchValue(role);
      }, 100);
    }
  }
  get connection() { return this._connection }

  @Output() onSave: EventEmitter<IConnections> = new EventEmitter();
  @Output() onCancellation: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: ConnectionService,
    private representativeService: RepresentativeService,
    private celebrityService: CelebrityService,
    private _flashMessagesService: FlashMessagesService,
    private formbuilder: FormBuilder
  ) {
    this.form = formbuilder.group({
      celebrity: new FormControl(null, Validators.required),
      representative: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required)
    });
  }

  private createConnectionString() {
    let representative = this.form.controls.representative.value;
    let role = this.form.controls.role.value;
    let celebrity = this.form.controls.celebrity.value;
    let result = '';
    switch (role) {
      case 1: {
        result = representative.name + ' is the agent of ' + celebrity.name;
        break;
      }
      case 2: {
        result = representative.name + ' is the publicist of ' + celebrity.name;
        break;
      }
      case 3: {
        result = representative.name + ' is the manager of ' + celebrity.name;
        break;
      }
      default:
        result = '';
    }
    return result;
  }

  writeConnection() {
    if (this.form.valid) {
      this.connectionString = this.createConnectionString();
    }
  }

  getConnection() {
    if (this.form.valid) {
      return this.createConnectionString();
    } else {
      return "";
    }
  }

  ngOnInit(): void {
    this.loadCelebrities();
    this.loadRepresentatives();

  }

  compareSelectObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  loadRepresentatives() {
    this.representativeService.getAll().subscribe((datas: Array<IRepresentative>) => {
      this.representativeList = datas;
    });
  }

  loadCelebrities() {
    this.celebrityService.getAll().subscribe((datas: Array<ICelebrity>) => {
      this.celebrityList = datas;
    });
  }

  save() {
    if (this.form.valid) {
      const data: IConnections = this.form.getRawValue();
      data.isAgent = (this.form.controls.role.value == 1);
      data.isPublicist = (this.form.controls.role.value == 2);
      data.isManager = (this.form.controls.role.value == 3);
      if (this.connection) {
        this.service
          .update(this.connection.id, data)
          .subscribe((res: any) => {
            if (res.code == 0) {
              alert('Erreur ! ' + res.detail);
            } else {
              this.onSave.emit(res);
            }
          })
          ;
      } else {
        this.service
          .create(data)
          .subscribe((res: any) => {
            if (res.code == 0) {
              alert('Erreur ! ' + res.detail);
              3.0
            } else {
              this.onSave.emit(res);
            }
          })
          ;
      }
    }
  }

  cancel() { this.onCancellation.emit(null); }

}
