declare namespace ipushpull {
    interface IPageContentLink {
        external: boolean;
        address: string;
    }
    interface IPageCellStyle {
        "background-color"?: string;
        "color"?: string;
        "font-family"?: string;
        "font-size"?: string;
        "font-style"?: string;
        "font-weight"?: string;
        "height"?: string;
        "number-format"?: string;
        "text-align"?: string;
        "text-wrap"?: string;
        "width"?: string;
        "tbs"?: string;
        "rbs"?: string;
        "bbs"?: string;
        "lbs"?: string;
        "tbc"?: string;
        "rbc"?: string;
        "bbc"?: string;
        "lbc"?: string;
        "tbw"?: string;
        "rbw"?: string;
        "bbw"?: string;
        "lbw"?: string;
    }
    interface IPageContentCell {
        value: string;
        formatted_value?: string;
        link?: IPageContentLink;
        style?: IPageCellStyle;
        dirty?: boolean;
    }
    interface IPageContent extends Array<any> {
        [index: number]: IPageContentCell[];
    }
    interface IPageDeltaContentCol {
        col_index: number;
        cell_content: IPageContentCell;
    }
    interface IPageDeltaContentRow {
        row_index: number;
        cols: IPageDeltaContentCol[];
    }
    interface IPageDelta {
        new_rows: number[];
        new_cols: number[];
        content_delta: IPageDeltaContentRow[];
    }
}
declare namespace ipushpull {
    interface IPageContentProvider {
        canDoDelta: boolean;
        update: (rawContent: IPageContent) => void;
        reset: () => void;
        getCell: (rowIndex: number, columnIndex: number) => IPageContentCell;
        updateCell: (rowIndex: number, columnIndex: number, data: IPageContentCell) => void;
        addRow: () => void;
        addColumn: () => void;
        removeRow: () => void;
        removeColumn: () => void;
        getDelta: () => IPageDelta;
        getFull: () => IPageContent;
        cleanDirty: () => void;
    }
    class PageContent implements IPageContentProvider {
        canDoDelta: boolean;
        private _original;
        private _current;
        private _newRows;
        private _newCols;
        current: IPageContent;
        constructor(rawContent: IPageContent);
        update(rawContent: IPageContent): void;
        reset(): void;
        getCell(rowIndex: number, columnIndex: number): IPageContentCell;
        updateCell(rowIndex: number, columnIndex: number, data: IPageContentCell): void;
        addRow(index?: number): IPageContentCell[];
        addColumn(index?: number): void;
        removeRow(): void;
        removeColumn(): void;
        getDelta(): IPageDelta;
        getFull(): IPageContent;
        cleanDirty(): void;
    }
}
