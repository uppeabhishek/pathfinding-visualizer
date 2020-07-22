import { getRandom } from "../commonUtilities";

export default class RandomizedPrims {

    private readonly array: HTMLTableSectionElement;
    private readonly startIndex: [number, number];

    constructor(array: HTMLTableSectionElement, startIndex: [number, number]) {
        this.array = array;
        this.startIndex = startIndex
    }

    randomPrims(maxRow: number, maxCol: number) {

        const res  = new Array(maxRow);

        for (let i=0;i<maxRow; i++) {
            res[i] = new Array(maxCol).fill(1);
        }
        
        const [x,y] = [getRandom(0, maxRow-1), getRandom(0, maxCol-1)];

        res[x][y] = 0;

    }

    plotOnGraph() {
        const trNodes = this.array.children;
        const trLength = trNodes.length;
        const tdLength = trNodes[0].children.length;

        this.randomPrims(trLength, tdLength);

    }
}