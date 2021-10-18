import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { GridTableColumn } from '../table.objects';
import { GridApi } from 'ag-grid-community';
import { ColumnsSelectorComponent } from '../columns-selector/columns-selector.component';

@Component({
  selector: 'app-list-properties',
  templateUrl: './list-properties.component.html',
  styleUrls: ['./list-properties.component.css']
})
export class ListPropertiesComponent implements OnInit {

  configuredColumns: Array<GridTableColumn> = [];

  @Input('predefinedColumns') predefinedColumns: Array<GridTableColumn> = [];
  @Input('gridApi') gridApi: GridApi | null = null;

  private _uid: string | any = null;
  @Input('uid')
  set uid(value: string) {
    this._uid = value;
    if (this._uid) this.configuredColumns = ListPropertiesComponent.loadListConfiguration(this._uid);
  };
  @ViewChild('columnsSelector') columnsSelector: ColumnsSelectorComponent;
  @Output('onClose') onClose: EventEmitter<any> = new EventEmitter();
  @Output('onValidate') onValidate: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  validateConfiguration() {
    if (this._uid == null) throw new Error('The UID is null make sure to spcify an UID for the grid to save the list properties config!');
    let selectedColumns = this.columnsSelector.selectedColumns;
    let mergedColumns = selectedColumns.map(column => {
      let res = this.configuredColumns.filter(c => c.field == column.field);
      // console.log({c, column, res});
      return res.length > 0 ? res[0] : column;
    });
    let config = localStorage.getItem('grid-list-config');
    let c: any = (config == null) ? {} : JSON.parse(config);
    c[this._uid] = mergedColumns;
    localStorage.setItem('grid-list-config', JSON.stringify(c));

    this.onValidate.emit(mergedColumns);
  }

  /**
   * Load configuration for table by uid
   * If no configuration found then create default one that will containe 
   * the predefeined configuration of columns
   * 
   * @param uid table uid
   * @param columns predefined columns
   */
  static loadListConfiguration(uid: any, columns: Array<GridTableColumn> | any = null) {
    if (uid == null || uid == undefined) return null;
    let config = localStorage.getItem('grid-list-config');
    if (config == null) return ListPropertiesComponent.initConfiguration(uid, columns);
    let c: any = JSON.parse(config);
    return (c.hasOwnProperty(uid)) ? c[uid] : ListPropertiesComponent.initConfiguration(uid, columns, JSON.parse(config));
  }

  /**
   * Init configuration for table if does not exist
   * 
   * @param uid table uid
   * @param columns predefined columns
   */
  static initConfiguration(uid: any, columns: Array<GridTableColumn>, config: any = null) {
    let c = config || {};
    c[uid] = columns;
    localStorage.setItem('grid-list-config', JSON.stringify(c));
    return columns;
  }

  /**
   * Update configuration for table
   * 
   * @param uid table uid
   * @param colID column ID (basicaly it's the column field)
   * @param property property to update
   * @param value value of the property
   */
  static updateColumnConfig(uid: any, colID: any, property: any, value: any) {
    let config = localStorage.getItem('grid-list-config');
    if (config == null) return;
    let c: any = JSON.parse(config);
    if (c.hasOwnProperty(uid)) {
      let columns: Array<any> = c[uid];
      columns.forEach((column, index) => {
        if (column.field == colID) {
          columns[index][property] = value;
        }
      });
      c[uid] = columns;
      localStorage.setItem('grid-list-config', JSON.stringify(c));
    }
  }

  close() {
    this.onClose.emit({});
  }
}
