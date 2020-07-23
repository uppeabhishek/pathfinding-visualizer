import { getRandom } from "../commonUtilities";

export default class RandomizedPrims {

    private readonly array: HTMLTableSectionElement;
    private readonly startIndex: [number, number];
    private readonly maxRow: number;
    private readonly maxCol: number;
    private readonly trNodes: HTMLCollectionOf<Element>;


    constructor(array: HTMLTableSectionElement, startIndex: [number, number]) {
        this.array = array;
        this.startIndex = startIndex;
        this.trNodes = this.array.children;
        this.maxRow = this.trNodes.length;
        this.maxCol = this.trNodes[0].children.length;
    }

    isValid(res: Array<[number, number]>, x: number, y: number) {
        if (x<0 || y<0 || x >=this.maxRow || y>=this.maxCol) {
            return 0;
        }
        return res[x][y];
    }

    pushNeighboursToWalls(res: Array<[number, number]>, x: number, y: number, walls: Array<[number, number]>) {

        if (this.isValid(res, x-1, y)){
            walls.push([x-1, y]);
        }
        if (this.isValid(res, x+1, y)){
            walls.push([x+1,y]);
        }
        if (this.isValid(res, x, y-1)){
            walls.push([x,y-1]);
        }
        if (this.isValid(res, x, y+1)){
            walls.push([x,y+1]);
        }
    }

    
    randomPrims() {

        const res  = new Array(this.maxRow);
        const walls: Array<[number, number]> = [];

        for (let i=0;i<this.maxRow; i++) {
            res[i] = new Array(this.maxCol).fill(1);
        }
        
        let currentCell = [getRandom(0, this.maxRow-1), getRandom(0, this.maxCol-1)];

        const [x, y] = currentCell;

        res[x][y] = 0;

        this.pushNeighboursToWalls(res, x,y, walls);

        let cnt = 0;

        while (walls.length!==0) {
            
            console.log(walls);
        
            cnt+=1;

            const wallIndex = getRandom(0, walls.length-1);
            
            const [x, y] = walls[wallIndex];

            walls.splice(wallIndex, 1);

            const left = this.isValid(res, x-1, y);
            const right = this.isValid(res, x+1, y);
            const top = this.isValid(res, x, y-1);
            const bottom = this.isValid(res, x, y+1);
            
            console.log(walls);


            if (!right && left) {
                res[x][y] = 0;
                this.pushNeighboursToWalls(res, x-1, y, walls);
            }
            else if (!left && right) {
                res[x][y] = 0;
                this.pushNeighboursToWalls(res, x+1, y,walls);
            }
            else if (!bottom && top) {
                res[x][y] = 0;
                this.pushNeighboursToWalls(res, x, y-1,  walls);
            }
            else if (!top && bottom) {
                res[x][y] = 0;
                this.pushNeighboursToWalls(res, x, y+1,  walls);
            }
        }
        console.log(walls, res, cnt);
        return res;
    }

    plotOnGraph() {
        console.log("hi");
        const trNodes = this.array.children;

        const res = this.randomPrims();
        // const res = generate({width: this.maxCol, height: this.maxCol});

        // console.log(res.length, res[0].length, this.maxRow, this.maxCol);
        for (let i=0;i<this.maxRow;i++) {
            for (let j=0;j<this.maxCol;j++) {
                if (res[i][j] === 1) {
                    trNodes[i].children[j].classList.add("selected");
                } 
            }
        }
    }
}