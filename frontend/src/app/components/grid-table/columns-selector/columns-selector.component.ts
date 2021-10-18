import { Component, OnInit, Input } from '@angular/core';
import { GridTableColumn } from '../table.objects';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'grid-columns-selector',
  templateUrl: './columns-selector.component.html',
  styleUrls: ['./columns-selector.component.css']
})
export class ColumnsSelectorComponent implements OnInit {
  @Input('columns') columns: GridTableColumn[] = [];
  @Input('selectedColumns') selectedColumns: GridTableColumn[] = [];

  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedColumns, event.previousIndex, event.currentIndex);
  }

  addColumn(column: GridTableColumn){
    if(!this.columnAlreadySelected(column)) this.selectedColumns.push(column);
  }

  removeColumn(index: number){
    this.selectedColumns.splice(index, 1);
  }

  addAllColumns(){
    this.selectedColumns = [...this.columns];
  }

  removeAllColumns(){
    this.selectedColumns = [];
  }

  private columnAlreadySelected(column: GridTableColumn){
    let filtered = this.selectedColumns.filter(c => c.field == column.field);
    return filtered.length != 0;
  }
}
