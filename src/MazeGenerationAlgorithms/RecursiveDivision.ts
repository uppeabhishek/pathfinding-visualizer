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

        this.isHorizontal = isHorizontalByUser!==undefined ? isHorizontalByUser : false;

    }

    getOrientation(width: number, height: number) {
        if (width < height) {
            this.isHorizontal = true;
        }
        else if(height < width) {
            this.isHorizontal = false;
        }
        else {
            getRandom(0, 1) === 0 ? this.isHorizontal = true : this.isHorizontal = false;
        }
    }

    divideGrid(res: Array<[number, number]>, x: number, y: number, width: number, height: number) {

        console.log(width, height);
        
        if (width < 2 || height < 2) {
            return;
        }

        this.getOrientation(width, height);

        let wallStartX = x + (this.isHorizontal ? 0 : getRandom(0, width/2 -1)); 
        let wallStartY = y + (this.isHorizontal ? getRandom(0, height/2 -1) : 0);

        const passageStartX = wallStartX + (this.isHorizontal ? getRandom(0, width-1): 0);
        const passageStartY = wallStartY + (this.isHorizontal ? 0: getRandom(0, height-1));

        const length = this.isHorizontal ? width : height;


        for (let i =0; i < length; i++){
            
            if (!(wallStartX===passageStartX && wallStartY===passageStartY)) {
                console.log(wallStartX, wallStartY);
                if (wallStartX > 0 && wallStartX < this.maxRow && wallStartY > 0 && wallStartY < this.maxCol) {
                    res[wallStartX][wallStartY] = 1;
                }
            }

            if (this.isHorizontal) {
                wallStartX+=1;
            }
            else {
                wallStartY+=1;
            }
        }

        // Left Part if vertical
        // Top Part if horizontal
        let tempX = x;
        let tempY = y;
        let tempWidth = this.isHorizontal ? width :  wallStartX - width + 1;
        let tempHeight = this.isHorizontal ? wallStartY - y + 1 : height;

        this.divideGrid(res, tempX, tempY, tempWidth, tempHeight);

        // Right Part if vertical
        // Bottom Part if horizontal
        tempX = this.isHorizontal ? x : wallStartX + 1;
        tempY = this.isHorizontal ? wallStartY + 1: y;
        tempWidth = this.isHorizontal ? width :  width - wallStartX + 1;
        tempHeight = this.isHorizontal ? height - wallStartY + 1 : height;

        this.divideGrid(res, tempX, tempY, tempWidth, tempHeight);
    }

    plotOnGraph() {
        const arr = new Array(this.maxRow);
        
        for (let i=0;i<this.maxRow; i++) {
            arr[i] = new Array(this.maxCol).fill(0);
        }
        this.divideGrid(arr, 0, 0, this.maxRow, this.maxCol);
        console.log(arr);
    }
}