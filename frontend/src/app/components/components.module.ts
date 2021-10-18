import { NgModule } from '@angular/core';
import { GridTableComponent } from './grid-table/grid-table.component';
import { ColumnsSelectorComponent } from './grid-table/columns-selector/columns-selector.component';
import { ExcelGeneratorComponent } from './grid-table/excel-generator/excel-generator.component';
import { TextFilterComponent } from './grid-table/filters/text-filter/text-filter.component';
import { ListPropertiesComponent } from './grid-table/list-properties/list-properties.component';
import { PrintingManagerComponent } from './grid-table/printing-manager/printing-manager.component';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalComponent } from './modal/modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        GridTableComponent,
        ColumnsSelectorComponent,
        ExcelGeneratorComponent,
        ModalComponent,
        TextFilterComponent,
        ListPropertiesComponent,
        PrintingManagerComponent,
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([]),
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        DragDropModule,
        MatNativeDateModule
    ],
    exports: [
        GridTableComponent,
    ],
    providers: [
        DatePipe,
        MatDatepickerModule,
    ]
})
export class ComponentsModule { }