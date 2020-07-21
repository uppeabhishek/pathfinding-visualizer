export default class RecursiveBackTracker {

    private readonly array: HTMLTableSectionElement;
    private readonly startIndex: [number, number];

    constructor(array: HTMLTableSectionElement, startIndex: [number, number]) {
        this.array = array;
        this.startIndex = startIndex
    }

    getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max-min+1)) + min;
    }

    getRandomNeighbour(i: number, j: number, maxi: number, maxj: number, visited: Set<string>) {
        let neighbours: Array<any> = [];

        if (i-1 > 0) {
            const temp = [i-1, j], tempString = temp.toString();
            if (!visited.has(tempString)) {
                neighbours.push(temp);
            }
        }
        if (i+1 < maxi) {
            const temp = [i+1, j], tempString = temp.toString();
            if (!visited.has(tempString)) {
                neighbours.push(temp);
            }
        }
        if (j-1 > 0) {
            const temp = [i, j-1], tempString = temp.toString();
            if (!visited.has(tempString)) {
                neighbours.push(temp);
            }
        }
        if (j+1 < maxj) {
            const temp = [i, j+1], tempString = temp.toString();
            if (!visited.has(tempString)) {
                neighbours.push(temp);
            }
        }
        if (!neighbours.length) {
            return -1;
        }
        const randomIndex = this.getRandom(0, neighbours.length-1);
        return neighbours[randomIndex];
    }
    
    removeWalls(randomNeighbour: [number, number] , currentCell: any,
             trNodes: any, trLength: number, tdLength: number) {

        if (randomNeighbour[1] > currentCell[1]) {
            trNodes[currentCell[0]].children[currentCell[1]].classList.add("borderRightNone");

            if (currentCell[1]+1 < tdLength) {
                trNodes[currentCell[0]].children[currentCell[1]+1].classList.add("borderLeftNone");
            }
        }

        else if (randomNeighbour[0] > currentCell[0]) {
            trNodes[currentCell[0]].children[currentCell[1]].classList.add("borderBottomNone");

            if (currentCell[0]+1 < trLength) {
                trNodes[currentCell[0]+1].children[currentCell[1]].classList.add("borderTopNone");
            }
        }

        else if(currentCell[1] > randomNeighbour[1]) {
            trNodes[currentCell[0]].children[currentCell[1]].classList.add("borderLeftNone");

            if (currentCell[1]-1 > 0) {
                trNodes[currentCell[0]].children[currentCell[1]-1].classList.add("borderRightNone");
            }
        }

        else if (currentCell[0] > randomNeighbour[0]) {
            trNodes[currentCell[0]].children[currentCell[1]].classList.add("borderTopNone");

            if (currentCell[0]-1 > 0) {
                trNodes[currentCell[0]-1].children[currentCell[1]].classList.add("borderBottomNone");
            }
        }
    }

    plotOnGraph() {
        const trNodes = this.array.children;
        const trLength = trNodes.length;
        const tdLength = trNodes[0].children.length;
        
        const stack: Array<any> = [];
        const visited: Set<string> = new Set([]);
        const walls: Set<string> = new Set([]);

        let i = this.startIndex[0], j = this.startIndex[1];

        let currentCell = [i, j];

        visited.add(currentCell.toString());

        stack.push(currentCell);

        let cnt = 0
        while (stack.length) {
            const temp = stack.pop();
            cnt+=1;
            if (temp) {
                currentCell = temp;
                const randomNeighbour = this.getRandomNeighbour(currentCell[0], currentCell[1], trLength, tdLength, visited);
                if (randomNeighbour !== -1) {
                    stack.push(currentCell);

                    this.removeWalls(randomNeighbour, currentCell, trNodes, trLength, tdLength);

                    visited.add(randomNeighbour.toString());
                    
                    stack.push(randomNeighbour);
                }
            }
        }
    }
}