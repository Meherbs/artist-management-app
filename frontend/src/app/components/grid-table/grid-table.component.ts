import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, ViewContainerRef, InjectionToken, Injector, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { GridTableColumn, GridTable } from './table.objects';
import { AgGridAngular } from 'ag-grid-angular';
import { RowNode } from 'ag-grid-community';
import { TextFilterComponent } from './filters/text-filter/text-filter.component';
import { Portal, ComponentPortal, TemplatePortal, PortalInjector } from '@angular/cdk/portal';
import { ExcelGeneratorComponent } from './excel-generator/excel-generator.component';
import { PrintingManagerComponent } from './printing-manager/printing-manager.component';
import { ListPropertiesComponent } from './list-properties/list-properties.component';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css']
})
export class GridTableComponent<T> implements OnInit, AfterViewInit {

  @ViewChild('grid') grid: AgGridAngular;
  @ViewChild('quickFilterInput') quickFilterInput: ElementRef;
  @ViewChild('dynamicContent', { read: ViewContainerRef }) dynamicContent: ViewContainerRef;

  private gridApi: any;
  private _columns: Array<GridTableColumn> = [];
  private readonly types: any = {
    date: 'dateFilter',
    text: 'textFilter',
    number: 'agNumberColumnFilter'
  }
  selectedPortal: Portal<any>;
  excelPortal: ComponentPortal<ExcelGeneratorComponent>;

  @Input()
  set columns(value: Array<GridTableColumn>) {
    this._columns = value;
    setTimeout(() => {
      let c = ListPropertiesComponent.loadListConfiguration(this.configuration.uid, this._columns);
      this.mergeColumns(c);
    }, 100);
  }

  get columns(): Array<GridTableColumn> {
    return this._columns;
  }

  @Input('data') data: Array<any> | any = null;
  @Input('dictionary') dictionary: any;
  @Input('configuration') configuration: GridTable | any = { height: '300px' };

  @Output('onRowSelection') selection: EventEmitter<Array<any>> = new EventEmitter();
  elementsCountText = '';
  agGridColumns: any = [];
  frameworkComponents = {
    textFilter: TextFilterComponent,
  };

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() { }

  ngAfterViewInit() {

  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    if (this.isMobileDevice()) this.configuration.resizeToFitWidth = false;
    if (this.configuration.resizeToFitWidth) this.grid.api.sizeColumnsToFit();
  }

  /**
   * Check if it's mobile device
   */
  private isMobileDevice() {
    let ua = navigator.userAgent;
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua));
  }

  private updateElementCountText() {
    let displayedCount = (this.data == null) ? 0 : this.data.length;
    this.elementsCountText = `${this.grid.api.getDisplayedRowCount()} ${this.configuration.dictionnary.rowsDisplayed} / ${displayedCount} ${this.configuration.dictionnary.rowsCreated}`;
  }

  onModelUpdated(params: any) {
    // console.log('model changed');
    this.updateElementCountText();
    this.manageFooter();
  }

  showLoading() {
    if (this.grid.api != undefined) this.grid.api.showLoadingOverlay();
  }

  hideLoading() {
    this.grid.api.hideOverlay();
  }

  private manageFooter() {
    let footerExist = (this.grid.api.getPinnedBottomRowCount() > 0);
    if (this.configuration.footerStrategy && this.data != undefined) {
      // console.log('rebuilding footer', this.grid.api.getModel());
      // console.log('data', this.data);
      // console.log('strategy', this.configuration.footerStrategy(this.data))
      if (!footerExist) // if footer not rendered yet
        this.grid.api.setPinnedBottomRowData([this.configuration.footerStrategy(this.data)]);
      else { // if footer already rendered we display footer based ont the filtered data
        let displayedData: any = [];
        this.grid.api.forEachNodeAfterFilter((row: RowNode) => {
          displayedData.push(row.data);
        })
        let pinnedValue: any = this.grid.api.getPinnedBottomRow(0);
        pinnedValue.setData(this.configuration.footerStrategy(displayedData))
      }
    }
  }

  onSelectionChanged($event: any) {
    let rows = $event.api.getSelectedRows();
    // console.log('onSelectionChanged', rows);
    this.selection.emit(rows);
  }

  /**
   * Get selected rows as array
   * @returns selected rows
   */
  getSelectedRows(): Array<T> {
    return (this.grid.api) ? this.grid.api.getSelectedRows() : [];
  }

  /**
   * Get AgGrid instance
   */
  getGrid(): AgGridAngular {
    return this.grid;
  }

  /**
   * Remove selected row from the view and model
   */
  removeSelectedRow() {
    let node = this.grid.api.getSelectedNodes();
    this.grid.api.removeItems(node);
    let rowD: any = this.grid.rowData;
    rowD.splice(node[0].rowIndex, 1);
  }

  quickFilter($event: any) {
    let reg = $event.target.value;
    this.grid.api.setQuickFilter(reg);
  }

  clearAllFilters() {
    this.grid.api.setFilterModel(null);
    this.grid.api.setQuickFilter('');
    this.grid.api.onFilterChanged();
    this.quickFilterInput.nativeElement.value = '';
  }

  private findRightColumnByNameAdnField(name: any, field: any): GridTableColumn {
    return this.columns.filter((c: GridTableColumn) => (c.name == name && c.field == field))[0];
  }

  /**
   * Merge givne columns with agGrid columns
   */
  private mergeColumns(columns: Array<GridTableColumn>) {
    this.agGridColumns = [];
    let skipSearch: boolean = (columns == null);
    if (columns == null) columns = this._columns;
    for (let c of columns) {
      let column: any = (skipSearch) ? c : this.findRightColumnByNameAdnField(c.name, c.field);
      let agColumn: any = {
        headerName: column.name,
        field: column.field,
        filterParams: {
          clearButton: true
        },
        sortable: true,
      };

      // if(column.type) agColumn['filter'] = this.types[column.type];
      if (column.filter) agColumn['filter'] = this.types[column.filter];
      if (column.width) agColumn['width'] = column.width;
      agColumn['resizable'] = (column.resizable) ?? true;
      // check if saved columns has width property then take instead the predefined column
      if (c.width) agColumn['width'] = c.width;
      if (column.valueGetter) agColumn['valueGetter'] = column.valueGetter;
      if (column.formatCell) {
        agColumn['cellRenderer'] = function (data: any) {
          // make sure that the data object has the key "value" before formatting cell
          // because if it hasn't it can be the footer row and the user did not 
          // specify any data for this cell 
          // so we should not display anything
          if (data.hasOwnProperty('value')) return column.formatCell(data)
        };
      }
      this.agGridColumns.push(agColumn);
    }
  }

  displayedRows(afterSorting: boolean): any[] {
    afterSorting = afterSorting || true;
    let displayedRows: any[] = [];
    if (afterSorting)
      this.grid.api.forEachNodeAfterFilterAndSort((row: RowNode) => {
        displayedRows.push(row.data);
      });
    else
      this.grid.api.forEachNodeAfterFilter((row: RowNode) => {
        displayedRows.push(row.data);
      });
    return displayedRows;
  }

  onColumnResize($event: any) {
    ListPropertiesComponent.updateColumnConfig(
      this.configuration.uid,
      $event.column.colId,
      'width',
      $event.column.actualWidth);
  }

  openExportExcelManager() {
    const factory: ComponentFactory<ExcelGeneratorComponent> = this.resolver.resolveComponentFactory(ExcelGeneratorComponent);
    const componentRef: ComponentRef<ExcelGeneratorComponent> = this.dynamicContent.createComponent(factory);
    componentRef.instance.columns = this.columns;
    componentRef.instance.gridApi = this.grid.api;

    componentRef.instance.tableName = this.configuration.name;
    componentRef.instance.onClose.subscribe(() => this.dynamicContent.remove(0));
  }

  openPrintingManager() {
    const factory: ComponentFactory<PrintingManagerComponent> = this.resolver.resolveComponentFactory(PrintingManagerComponent);
    const componentRef: ComponentRef<PrintingManagerComponent> = this.dynamicContent.createComponent(factory);
    componentRef.instance.columns = this.columns;
    componentRef.instance.gridApi = this.grid.api;
    componentRef.instance.tableName = this.configuration.name;
    componentRef.instance.onClose.subscribe(() => this.dynamicContent.remove(0));
  }

  openListProperties() {
    const factory: ComponentFactory<ListPropertiesComponent> = this.resolver.resolveComponentFactory(ListPropertiesComponent);
    const componentRef: ComponentRef<ListPropertiesComponent> = this.dynamicContent.createComponent(factory);
    componentRef.instance.predefinedColumns = this.columns;
    componentRef.instance.gridApi = this.grid.api;
    componentRef.instance.uid = this.configuration.uid;
    componentRef.instance.onClose.subscribe(() => this.dynamicContent.remove(0));
    componentRef.instance.onValidate.subscribe((columns: Array<GridTableColumn>) => {
      this.mergeColumns(columns);
      // this.grid.api.setColumnDefs(this.agGridColumns);
      this.dynamicContent.remove(0);
    });
  }

  /**
   * Get the value of a specific property (even nested ones) of an object
   * @param object 
   * @param property properties you want to access "property.nestedProperty1.nestedProperty2"
   */
  static property_accessor(object: any, property: string) {
    property = property.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    property = property.replace(/^\./, '');           // strip a leading dot
    let a = property.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      let k = a[i];
      if (object == null) {
        return;
      } else {
        if (k in object) {
          object = object[k];
        } else {
          return;
        }
      }
    }
    return object;
  }
}
