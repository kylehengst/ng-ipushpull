namespace ipushpull {
    "use strict";

    export interface IPageContentLink {
        external: boolean;
        address: string;
    }

    export interface IPageCellStyle {
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

    export interface IPageContentCell {
        value: string;
        formatted_value?: string;
        link?: IPageContentLink;
        style?: IPageCellStyle;
        dirty?: boolean;
    }

    export interface IPageContent extends Array<any> {
        [index: number]: IPageContentCell[];
    }

    export interface IPageDeltaContentCol {
        col_index: number;
        cell_content: IPageContentCell;
    }

    export interface IPageDeltaContentRow {
        row_index: number;
        cols: IPageDeltaContentCol[];
    }

    export interface IPageDelta {
        new_rows: number[];
        new_cols: number[];
        content_delta: IPageDeltaContentRow[];
    }
}

namespace ipushpull {
    "use strict";

    export interface IPageContentProvider {
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

    export class PageContent implements IPageContentProvider {
        public canDoDelta: boolean = true;

        private _original: IPageContent = [[]];
        private _current: IPageContent = [[]];

        private _newRows: number[] = [];
        private _newCols: number[] = [];

        public get current(): IPageContent { return this._current; }

        public constructor(rawContent: IPageContent = [[]]){
            this.update(rawContent);
        }

        public update(rawContent: IPageContent): void{
            this._original = Utils.clonePageContent(rawContent);

            let current: IPageContent = Utils.clonePageContent(this._current);

            // Extend the matrix of incoming content
            for (let i: number = 0; i < this._newRows.length; i++){
                rawContent.splice(this._newRows[i], 0, current[i]);
            }

            for (let i: number = 0; i < this._newCols.length; i++){
                for (let j: number = 0; j < rawContent.length; j++){
                    // Skip new rows because they are already in right matrix
                    if (this._newRows.indexOf(j) >= 0 || j >= current.length){
                        continue;
                    }

                    rawContent[j].splice(this._newCols[i], 0, current[j][i]);
                }
            }

            // Shrink matrix to incoming matrix if possible
            if (rawContent.length < current.length){
                // @todo Loop through current from rawContent.length and remove rows that are not marked as new and recalculate other new rows
            }

            // @todo Do same for columns

            // Now that we have same dimensions of matrix we can update only non-touched cells
            for (let i: number = 0; i < rawContent.length; i++){
                // New rows (end of table)
                if (!current[i]){
                    current.push(rawContent[i]);
                    continue;
                }

                for (let j: number = 0; j < rawContent[i].length; j++){
                    // New columns (end of table)
                    if (!current[i][j]){
                        current[i].push(rawContent[i][j]);
                        continue;
                    }

                    if (current[i][j].dirty){
                        continue;
                    }

                    current[i][j] = rawContent[i][j];
                }
            }

            // Empty content
            if (!current[0].length) {
                current[0][0] = {value: "", formatted_value: ""};
            }

            this._current = PageStyles.decompressStyles(current);
        }

        public reset(): void {
            // Remove new rows and columns
            for (let i: number = 0; i < this._newRows.length; i++){
                this._current.splice(this._newRows[i], 1);
            }

            for (let i: number = 0; i < this._newCols.length; i++){
                for (let j: number = 0; j < this._current.length; j++){
                    this._current[j].splice(this._newCols[i], 1);
                }
            }

            this.cleanDirty();
            this.update(this._original);
        }

        public getCell(rowIndex: number, columnIndex: number): IPageContentCell {
            if (!this._current[rowIndex]){
                throw new Error("row out of bounds");
            }
            
            if (!this._current[rowIndex][columnIndex]){
                throw new Error("column out of bounds");
            }
            
            return this._current[rowIndex][columnIndex];
        }
        
        public updateCell(rowIndex: number, columnIndex: number, data: IPageContentCell): void {
            if (!this._current[rowIndex]){
                throw new Error("row out of bounds");
            }

            if (!this._current[rowIndex][columnIndex]){
                throw new Error("column out of bounds");
            }

            // Check if cell has been edited
            if (this._original[rowIndex] && this._original[rowIndex][columnIndex]){
                data.dirty = (this._original[rowIndex][columnIndex].formatted_value !== data.formatted_value);
            } else {
                data.dirty = true;
            }

            // @todo This will probably not work with styles
            angular.merge(this._current[rowIndex][columnIndex], data);
        }

        public addRow(index?: number): IPageContentCell[] {
            if (!index){
                index = this._current.length;
            }

            let newRowData: IPageContentCell[] = [];

            // Clone row before
            if (this._current.length) {
                newRowData = angular.copy(this._current[index - 1]);
                for (let i: number = 0; i < newRowData.length; i++) {
                    // Erase values
                    newRowData[i].value = "";
                    newRowData[i].formatted_value = "";

                    // Make sure we have style object
                    newRowData[i].style = (newRowData[i].style) ? newRowData[i].style : {};

                    newRowData[i].dirty = true;
                }
            }

            this._current.splice(index, 0, newRowData);

            // Recalculate other new rows positions
            for (let i: number = 0; i < this._newRows.length; i++) {
                if (this._newRows[i] >= (index)) {
                    this._newRows[i]++;
                }
            }

            this._newRows.push(index);

            return newRowData;
        }

        public addColumn(index?: number): void {
            if (!index){
                index = (this._current.length) ? this._current[0].length : 0;
            }

            if (!this._current.length){
                this.addRow(0);
                return;
            }

            // Clone previous column
            for (let i: number = 0; i < this._current.length; i++) {
                let data: IPageContentCell = {
                    value: "",
                    formatted_value: "",
                    style: (index) ? angular.copy(this._current[i][index - 1].style) : {},
                    dirty: true,
                };

                this._current[i].splice(index, 0, data);
            }

            // If we added columns before, we need to change their index
            for (let i: number = 0; i < this._newCols.length; i++) {
                if (this._newCols[i] >= index){
                    this._newCols[i]++;
                }
            }

            this._newCols.push(index);
        }

        public removeRow(): void {
            this.canDoDelta = false;
        }

        public removeColumn(): void {
            this.canDoDelta = false;
        }

        // @todo Would be better to supply the two contents rather than using "this"
        public getDelta(): IPageDelta {
            // This is expensive, but will get proper styles
            let current: IPageContent = PageStyles.compressStyles(Utils.clonePageContent(this._current));

            /**
             * Specs (Jira IPPWSTWO-195)
             * @type {{new_rows: Array, new_cols: Array, content_delta: *[]}}
             */
            let deltaStructure: IPageDelta = {
                // First "commit" changes to the layout of page - add new cols and rows
                new_rows: [], // List of new rows. List through all of them and add+1 to all after @todo: to have true delta, we should have extra endpoint to add row
                new_cols: [], // List of new cols. List through all of them and add+1 to all after @todo: to have true delta, we should have extra endpoint to add column

                // @todo: Handle removed rows and cols

                // Second, process the data - Data will have right referencing already with added rows and cells
                content_delta: [
                    {
                        row_index: 0,
                        cols: [
                            {
                                col_index: 0,
                                cell_content: {
                                    value: "",
                                },
                            },
                        ],
                    },
                ],
            };

            /**
             *  --------------------------------------------
             */

            deltaStructure.content_delta = []; // just empty it
            deltaStructure.new_rows = this._newRows;
            deltaStructure.new_cols = this._newCols;

            let rowMovedBy: number = 0;
            let colMovedBy: number = 0;

            // @todo Every cell will get full styles basically braking inheritence model = adding more data to a page. We need to be able to work around this somehow
            for (let i: number = 0; i < current.length; i++) {
                let rowData: any = {};
                let newRow: boolean = (this._newRows.indexOf(i) >= 0);

                colMovedBy = 0;

                if (newRow) {
                    rowData = {
                        row_index: i,
                        cols: [],
                    };

                    rowMovedBy++;
                }

                for (let j: number = 0; j < current[i].length; j++) {
                    if (newRow) {
                        let cell: IPageContentCell = angular.copy(current[i][j]);
                        delete cell.dirty;

                        rowData.cols.push({
                            col_index: j,
                            cell_content: cell,
                        });
                    } else {
                        let newCol: boolean = (this._newCols.indexOf(j) >= 0);

                        if (newCol) {
                            colMovedBy++;
                        }

                        if (newCol || current[i][j].dirty) {
                            if (!Object.keys(rowData).length) {
                                rowData = {
                                    row_index: i,
                                    cols: [],
                                };
                            }

                            let cell: IPageContentCell = angular.copy(current[i][j]);
                            delete cell.dirty;

                            rowData.cols.push({
                                col_index: j,
                                cell_content: cell,
                            });
                        }
                    }
                }

                if (Object.keys(rowData).length){
                    deltaStructure.content_delta.push(rowData);
                }

                // Sort new cols and rows
                // @todo uncomment this when deleting rows and columns is enabled
                /*deltaStructure.new_cols.sort(ipp.utils.sortByNumber);
                 deltaStructure.new_rows.sort(ipp.utils.sortByNumber);*/
            }

            // @todo Do something with styles

            return deltaStructure;
        }

        public getFull(): IPageContent {
            let content: IPageContent = Utils.clonePageContent(this._current);

            // Remove dirty indicator
            for (let i: number = 0; i < content.length; i++){
                for (let j: number = 0; j < content[i].length; j++){
                    delete content[i][j].dirty;
                }
            }

            return PageStyles.compressStyles(content);
        }

        // @todo Not great...
        public cleanDirty(): void {
            for (let i: number = 0; i < this._current.length; i++){
                for (let j: number = 0; j < this._current[i].length; j++){
                    delete this._current[i][j].dirty;
                }
            }

            this._newCols = [];
            this._newRows = [];
        }
    }

    interface IPageStyler {
        makeStyle: (cellStyle: IPageCellStyle) => IPageCellStyle;
        reset: () => void;
        reverseCellStyle: (cellStyle: IPageCellStyle, fullStyles?: boolean) => IPageCellStyle;
        cleanUpReversed: (content: IPageContent) => IPageContent;
    }

    class PageStyles implements IPageStyler {
        /**
         * Holds current set of styles (inheritence)
         * @type {{}}
         */
        private currentStyle: IPageCellStyle = {};

        /**
         * Holds current set of borders (inheritence)
         * @type {{top: {}; right: {}; bottom: {}; left: {}}}
         */
        private currentBorders: any = {top: {}, right: {}, bottom: {}, left: {}};

        /**
         * Linking names of excel/json styles to css styles
         * @type {{text-wrap: string, tbs: string, rbs: string, bbs: string, lbs: string, tbc: string, rbc: string, bbc: string, lbc: string, tbw: string, rbw: string, bbw: string, lbw: string}}
         */
        private excelStyles: any = {
            "text-wrap": "white-space",
            "tbs": "border-top-style",
            "rbs": "border-right-style",
            "bbs": "border-bottom-style",
            "lbs": "border-left-style",
            "tbc": "border-top-color",
            "rbc": "border-right-color",
            "bbc": "border-bottom-color",
            "lbc": "border-left-color",
            "tbw": "border-top-width",
            "rbw": "border-right-width",
            "bbw": "border-bottom-width",
            "lbw": "border-left-width",
        };

        /**
         * Map excel border styles to css border styles (with some compromise)
         * @type {{solid: string, thin: string, thick: string, hair: string, dash: string, dashed: string, dashdot: string, mediumdashed: string, mediumdashdot: string, slantdashdot: string, dot: string, dotted: string, hairline: string, mediumdashdotdot: string, dashdotdot: string, double: string}}
         */
        private excelBorderStyles: any = {
            "solid": "solid",
            "thin": "solid",
            "thick": "solid",
            "hair": "solid",

            "dash": "dashed",
            "dashed": "dashed",
            "dashdot": "dashed",
            "mediumdashed": "dashed",
            "mediumdashdot": "dashed",
            "slantdashdot": "dashed",

            "dot": "dotted",
            "dotted": "dotted",
            "hairline": "dotted", // Hairline is weight not style in excel (Whaaaat??),
            "mediumdashdotdot": "dotted",
            "dashdotdot": "dotted",

            "double": "double",
        };

        /**
         * Map excel border weights to css border weights (with some compromise)
         * @type {{thin: string, medium: string, thick: string, hair: string, hairline: string, double: string}}
         */
        private excelBorderWeights: any = {
            "thin": "1px",
            "medium": "1px",
            "thick": "2px",
            "hair": "1px",
            "hairline": "1px",
            "double": "3px",
        };

        /**
         * Styles to be ignored when rendering styles from excel/json - these styles cannot be represented in css
         * @type {string[]}
         */
        private ignoreStyles: string[] = [
            "number-format",
        ];

        /**
         * Take styles in inheritence form that is supplied by service and decompress them into cell-by-cell styles
         * @param content
         * @returns {IPageContent}
         */
        public static decompressStyles(content: IPageContent): IPageContent {
            let styler: IPageStyler = new PageStyles();

            for (let i: number = 0; i < content.length; i++){
                for (let j: number = 0; j < content[i].length; j++) {
                    content[i][j].style = styler.makeStyle(content[i][j].style);
                }
            }

            return content;
        }

        public static compressStyles(content: IPageContent): IPageContent {
            let styler: IPageStyler = new PageStyles();

            // Reverse styles from CSS-like to General
            for (let i: number = 0; i < content.length; i++) {
                for (let j: number = 0; j < content[i].length; j++) {
                    content[i][j].style = styler.reverseCellStyle(content[i][j].style);
                }
            }

            // Clean up reversed styles - apply inheritance
            return styler.cleanUpReversed(content);
        }

        /**
         * Clear current values and start from zero
         */
        public reset(): void{
            this.currentStyle = {};
            this.currentBorders = {top: {}, right: {}, bottom: {}, left: {}};
        }

        /**
         * Parses cell styles from provided style rules.
         *
         * @param styleOrig
         * @returns {string}
         */
        public makeStyle(cellStyle: IPageCellStyle): IPageCellStyle {
            let styleName: string,
                style: IPageCellStyle = angular.copy(cellStyle);

            for (let item in style) {
                if (!style.hasOwnProperty(item)){
                    continue;
                }

                if (this.ignoreStyles.indexOf(item) >= 0) {
                    continue;
                }

                styleName = this.excelToCSS(item);

                let prefix: string = "",
                    suffix: string = "";

                if ((styleName === "color" || styleName === "background-color") && style[item] !== "none" && style[item].indexOf("#") < 0) {
                    prefix = "#";
                }

                if (styleName === "white-space") {
                    style[item] = (style[item] === "normal") ? "pre" : "pre-wrap";
                }

                if (styleName.indexOf("border") >= 0) {
                    let pos: string = styleName.split("-")[1];

                    if (styleName.indexOf("-style") >= 0) {
                        this.currentBorders[pos].style = this.excelBorderStyles[style[item]] || undefined;
                    }

                    if (styleName.indexOf("-width") >= 0) {
                        this.currentBorders[pos].width = (style[item] !== "none") ? this.excelBorderWeights[style[item]] : undefined; // use current value if not in array (if supplied number of px)
                    }

                    if (styleName.indexOf("-color") >= 0) {
                        this.currentBorders[pos].color = (style[item] === "none") ? "transparent" : "#" + style[item];
                    }

                    continue;
                }

                this.currentStyle[styleName] = prefix + style[item] + suffix;
            }

            let resultStyles: IPageCellStyle = angular.copy(this.currentStyle);

            // Process currentBorders
            for (let borderPos in this.currentBorders) {
                if (typeof this.currentBorders[borderPos].style === "undefined" || !this.currentBorders[borderPos].style){
                    continue;
                }

                resultStyles["border-" + borderPos] = `${this.currentBorders[borderPos].width} ${this.currentBorders[borderPos].style} ${this.currentBorders[borderPos].color}`;
            }


            return resultStyles;
        }

        public reverseCellStyle(cellStyle: IPageCellStyle, fullStyles: boolean = true): IPageCellStyle {
            let genericStyle: IPageCellStyle = {};

            // First convert all styles into generic format
            for (let style in cellStyle){
                if (!cellStyle.hasOwnProperty(style)){
                    continue;
                }

                if (style.indexOf("border") < 0){
                    if (style === "color" || style === "background-color"){
                        cellStyle[style] = cellStyle[style].replace("#", "");
                    }

                    // @todo text-wrap

                    // Force only one font name - better to do this here than on client
                    if (style === "font-family"){
                        cellStyle[style] = cellStyle[style].split(",")[0];
                    }

                    genericStyle[this.CSSToExcel(style)] = cellStyle[style].trim();
                } else {
                    let pos: string = style.split("-")[1].charAt(0);
                    let parts: string[] = cellStyle[style].split(" ");

                    genericStyle[pos + "bw"] = this.excelBorderWeight(parts[0]);
                    genericStyle[pos + "bs"] = parts[1];
                    genericStyle[pos + "bc"] = parts[2].replace("#", "");
                }
            }

            if (fullStyles) {
                /**
                 * Here we are setting default value for borders, because if there are no borders then they simply dont show up in css text.
                 * If they dont show up in css text when scraping styles it would appear as it should inherit borders from the cells
                 * before but in fact there should be no borders. We have to think about it that there is no inheritance with css, every
                 * cell has its own full set of css and is not dependent on preceding cells. For example background wouldnt show up as well
                 * but since we dont use transparent background but instead every cell is white by default, when cell should appear transparent
                 * it is set back to 000000 thus breaking the inheritance.
                 *
                 * @todo soooooo fiddly
                 */

                // This goes through all excel styles and if cell doesnt have that style it adds it
                for (let eStyle in this.excelStyles) {
                    if (!this.excelStyles.hasOwnProperty(eStyle)) {
                        continue;
                    }

                    if (eStyle === "text-wrap") {
                        continue;
                    }

                    if (!genericStyle[eStyle]) {
                        genericStyle[eStyle] = "none";
                    }
                }
            }

            return genericStyle;
        }

        public cleanUpReversed(content: IPageContent): IPageContent{
            let styleCurrent: IPageCellStyle = {};

            for (let i: number = 0; i < content.length; i++) {
                for (let j: number = 0; j < content[i].length; j++) {
                    let styleCopy: any = angular.copy(content[i][j].style);

                    for (let styleName in styleCopy) {
                        if (!styleCopy.hasOwnProperty(styleName)){
                            continue;
                        }

                        if (styleCurrent[styleName] && (styleCurrent[styleName] === styleCopy[styleName])) {
                            // This style is inherited from somewhere else so delete it from this cell
                            delete content[i][j].style[styleName];
                        } else {
                            // Its different so save it for others to inherit
                            styleCurrent[styleName] = styleCopy[styleName];
                        }
                    }

                    if (!Object.keys(content[i][j].style).length) {
                        delete content[i][j].style;
                    }
                }
            }

            return content;
        }

        /**
         * Helper function to get right css name of style based on excel name
         * @param val
         * @returns {*}
         */
        private excelToCSS(val: string): string {
            return (this.excelStyles[val]) ? this.excelStyles[val] : val;
        }

        /**
         * Helper function to get right excel style name based on css name
         * @param val
         * @returns {*}
         * @constructor
         */
        private CSSToExcel(val: string): string {
            let excelVal: string = val;

            for (let style in this.excelStyles) {
                if (this.excelStyles[style] === val) {
                    excelVal = style;
                    break;
                }
            }

            return excelVal;
        }

        /**
         * Helper to get excel border weight value based on css pixel value
         * @param pixels
         * @returns {string}
         */
        private excelBorderWeight(pixels: string): string {
            let bWeight: string = "";

            for (let weight in this.excelBorderWeights) {
                if (!this.excelBorderWeights.hasOwnProperty(weight)){
                    continue;
                }

                if (this.excelBorderWeights[weight] === pixels) {
                    bWeight = weight;
                    break;
                }
            }

            return bWeight;
        }

        private rgbToHex(rgb: string): string {
            rgb = rgb.replace("rgb(", "").replace(")", "");
            let parts: string[] = rgb.split(",");

            return this.componentToHex(parseInt(parts[0], 10)) + this.componentToHex(parseInt(parts[1], 10)) + this.componentToHex(parseInt(parts[2], 10));
        }

        private componentToHex(c): string {
            let hex: string = c.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }
    }
}
