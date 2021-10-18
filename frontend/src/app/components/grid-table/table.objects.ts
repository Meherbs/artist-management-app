

export interface GridTableColumn {
    name: string;
    field: string;
    /** @deprecated use "filter" instead */
    type?: 'date' | 'text' | 'number';
    width?: number;
    sortable?: boolean;
    filter?: 'date' | 'text' | 'number';
    resizable?: boolean;
    formatCell?: (data: any) => string | null;
    /**
     * valueGetter very useful when you have complex object in the cell
     * and you want to work with filter
     * so you have to exposed a specific attribute of the object
     * valueGetter: (params) => {
     *      return params.data.user.username;
     * }
     */
    valueGetter?: (params: any) => any;
    /**
     * Simple format
     * will be used when exporting or printing data
     * especially for comploex objects
     */
    simpleFormat?: (cellValue: any, object?: any) => string | null;
}

export interface GridTable {
    sorting?: boolean;
    filtering?: boolean;
    columnsResize?: boolean;
    movableColumns?: boolean;
    rowSelection?: 'multiple' | 'single';
    footerStrategy?: (rows: Array<any>) => {};
    dictionnary?: any;
    height?: string;
    resizeToFitWidth?: boolean;
    name?: string;
    uid?: string;
}

export const GridDictionnary: any = {
    // filter
    equals: 'Equals',
    notEqual: 'Not equal',
    lessThan: 'Less than',
    greaterThan: 'Greater than',
    inRange: 'In range',
    lessThanOrEqual: 'Less than or equal',
    greaterThanOrEqual: 'Greater than or equal',
    notContains: 'Not contains',
    contains: 'Contains',
    startsWith: 'Start with',
    endsWith: 'End With',
    clearFilter: 'Clear',
    filterOoo: 'Search...',
    rowsDisplayed: ' displayed rows',
    rowsCreated: ' rows created',
    // others
    noRowsToShow: 'No rows to show.',
    loadingOoo: 'Loading data...',

    // custom
    clearAllFilters: 'Clear all filters',
    quickFilter: 'Quick search...'
};
