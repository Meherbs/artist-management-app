import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IFilterParams, RowNode, IAfterGuiAttachedParams, IDoesFilterPassParams } from 'ag-grid-community';

@Component({
    selector: 'text-filter-cell',
    templateUrl: 'text-filter.component.html',
    styleUrls: ['text-filter.component.css']
})
export class TextFilterComponent implements IFilterAngularComp {
    @ViewChild('search') search: ElementRef<HTMLInputElement>;
    private params: IFilterParams | any;
    private guiParams: IAfterGuiAttachedParams | any;
    private valueGetter: (rowNode: RowNode) => any;
    elements: string[] = [];
    filtered: string[] = [];
    selected: string[] = [];

    constructor() { }

    agInit(params: IFilterParams): void {
        this.params = params;
        this.valueGetter = params.valueGetter;
        this.collectElements();
    }

    private collectElements() {
        let rows: RowNode[] = (<any>this.params.rowModel).rowsToDisplay;
        let set = new Set<string>();
        let emptyValueExist = false;
        rows.forEach((node: RowNode) => {
            let columnValue = this.valueGetter(node);
            if (columnValue == '' || columnValue == null) emptyValueExist = true;
            else set.add(columnValue);
        });
        this.elements = Array.from(set);
        if (emptyValueExist) this.elements.unshift('Vide');
        this.filtered = [...this.elements];
        this.selected = [...this.elements];
    }

    elementChecked(checked: boolean, value: string) {
        if (value == 'All') {
            this.selected = (checked) ? [...this.filtered] : [];
        } else {
            if (checked) this.selected.push(value);
            else this.selected.splice(this.selected.indexOf(value), 1);
        }

    }

    searchInElements($event: any) {
        let reg: string = $event.target.value;
        this.filtered = this.elements.filter(x => x.toLowerCase().indexOf(reg.toLowerCase()) != -1);
        this.selected = [...this.filtered];
    }

    isFilterActive(): boolean {
        return this.getModel() != null;
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        let cellValue = this.valueGetter(params.node);
        if (this.selected.includes('Vide')) {
            return this.selected.includes(cellValue) || (cellValue == '' || cellValue == null);
        }
        return this.selected.includes(cellValue);
    }

    getModel() {
        return (this.selected.length == this.elements.length) ? null : this.selected;
    }

    setModel(model: string[]): void {
        if (model == null) this.selected = [...this.elements];
        else this.selected = model;
    }

    onNewRowsLoaded?(): void {
        throw new Error("Method not implemented.");
    }

    filter() {
        this.params.filterChangedCallback();
        this.guiParams.hidePopup();
    }

    cancel() {
        this.params.api.destroyFilter(this.params.column.getColId());
        this.guiParams.hidePopup();
    }

    afterGuiAttached(params?: IAfterGuiAttachedParams) {
        this.guiParams = params;
    }
}