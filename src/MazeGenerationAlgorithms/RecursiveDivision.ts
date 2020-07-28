import { getRandom } from "../commonUtilities";

export default class RecursiveDivision {
    private readonly array: HTMLTableSectionElement;

    private readonly maxRow: number;

    private readonly maxCol: number;

    private readonly trNodes: HTMLCollectionOf<Element>;

    private isHorizontal: boolean;

    private readonly isHorizontalByUser: boolean | undefined;

    constructor(array: HTMLTableSectionElement, isHorizontalByUser?: boolean) {
        this.array = array;
        this.trNodes = this.array.children;
        this.maxRow = this.trNodes.length;
        this.maxCol = this.trNodes[0].children.length;
        this.isHorizontalByUser = isHorizontalByUser;

        this.isHorizontal = isHorizontalByUser !== undefined ? isHorizontalByUser : false;
    }

    getOrientation(width: number, height: number) {
        if (width < height) {
            this.isHorizontal = true;
        } else if (height < width) {
            this.isHorizontal = false;
        } else {
            getRandom(0, 1) === 0 ? (this.isHorizontal = true) : (this.isHorizontal = false);
        }
    }

    divideGrid(res: Array<[number, number]>, x: number, y: number, height: number, width: number) {
        if (width < 2 || height < 2) {
            return;
        }

        this.getOrientation(width, height);

        let currentX = this.isHorizontal ? x + getRandom(0, height - 1) : x;
        let currentY = this.isHorizontal ? y : y + getRandom(0, width - 1);

        const length = this.isHorizontal ? width : height;

        const passageX = this.isHorizontal ? currentX : currentX + getRandom(0, height - 1);
        const passageY = this.isHorizontal ? currentY + getRandom(0, width - 1) : currentY;

        for (let i = 0; i < length; i++) {
            if (!(currentX === passageX && currentY === passageY)) {
                try {
                    res[currentX][currentY] = 1;
                } catch (e) {
                    // Console.log(currentX, currentY);
                }
            }
            if (this.isHorizontal) {
                currentY += 1;
            } else {
                currentX += 1;
            }
        }

        if (this.isHorizontal) {
            const tempX = x;
            const tempY = y;
            const tempHeight = this.isHorizontal ? currentX - x : height;
            const tempWidth = this.isHorizontal ? width : currentY - y;

            // Console.log(x, y, currentX, currentY, width, height);

            /*
             * Console.log(x, y, currentY, currentX-y);
             * console.log(x, y+currentX+1, currentY, height - currentX - 1);
             */
            if (currentX - y > 0) {
                this.divideGrid(res, x, y, currentY, currentX - y);
            }

            if (y + currentX + 1 < this.maxRow) {
                this.divideGrid(res, x, y + currentX + 1, currentY, height - currentX - 1);
            }
        } else {
            /*
             * Console.log(x, y, currentY-x, currentX);
             * console.log(x + currentY+1, y, width - currentY -1, currentX);
             */

            if (currentY - x > 0) {
                this.divideGrid(res, x, y, currentY - x, currentX);
            }

            if (x + currentY + 1 < this.maxCol) {
                this.divideGrid(res, x + currentY + 1, y, width - currentY - 1, currentX);
            }
        }

        /*
         * TempX = this.isHorizontal ? currentX + 1 : x;
         * tempY = this.isHorizontal ? y : currentY+1;
         * tempHeight = this.isHorizontal ? height - currentX: height;
         * tempWidth = this.isHorizontal ? width : width - currentY;
         */

        // This.divideGrid(res, tempX, tempY, tempHeight, tempWidth);
    }

    plotOnGraph() {
        const arr = new Array(this.maxRow);

        for (let i = 0; i < this.maxRow; i++) {
            arr[i] = new Array(this.maxCol).fill(0);
        }
        this.divideGrid(arr, 0, 0, this.maxRow, this.maxCol);
        for (let i = 0; i < this.maxRow; i++) {
            for (let j = 0; j < this.maxCol; j++) {
                if (arr[i][j] === 1) {
                    this.trNodes[i].children[j].classList.add("wall");
                }
            }
        }
    }
}
