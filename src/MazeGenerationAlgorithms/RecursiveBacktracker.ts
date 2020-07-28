import { getRandom } from "../commonUtilities";

export default class RecursiveBackTracker {
    private readonly array: HTMLTableSectionElement;

    private readonly startIndex: [number, number];

    constructor(array: HTMLTableSectionElement, startIndex: [number, number]) {
        this.array = array;
        this.startIndex = startIndex;
    }

    getRandomNeighbour(i: number, j: number, maxi: number, maxj: number, visited: Set<string>) {
        const neighbours: Array<any> = [];

        if (i - 2 > 0) {
            const temp = [i - 2, j];
            const tempString = temp.toString();

            if (!visited.has(tempString)) {
                neighbours.push(temp);
            }
        }
        if (i + 2 < maxi) {
            const temp = [i + 2, j];
            const tempString = temp.toString();

            if (!visited.has(tempString)) {
                neighbours.push(temp);
            }
        }
        if (j - 2 > 0) {
            const temp = [i, j - 2];
            const tempString = temp.toString();

            if (!visited.has(tempString)) {
                neighbours.push(temp);
            }
        }
        if (j + 2 < maxj) {
            const temp = [i, j + 2];
            const tempString = temp.toString();

            if (!visited.has(tempString)) {
                neighbours.push(temp);
            }
        }
        if (!neighbours.length) {
            return -1;
        }
        const randomIndex = getRandom(0, neighbours.length - 1);

        return neighbours[randomIndex];
    }

    removeWalls(
        randomNeighbour: [number, number],
        currentCell: any,
        trNodes: any,
        trLength: number,
        tdLength: number
    ) {
        if (randomNeighbour[1] > currentCell[1]) {
            if (currentCell[1] + 1 < tdLength) {
                trNodes[currentCell[0]].children[currentCell[1] + 1].classList.add("wall");
            }
        } else if (randomNeighbour[0] > currentCell[0]) {
            if (currentCell[0] + 1 < trLength) {
                trNodes[currentCell[0] + 1].children[currentCell[1]].classList.add("wall");
            }
        } else if (currentCell[1] > randomNeighbour[1]) {
            if (randomNeighbour[1] + 1 < tdLength) {
                trNodes[randomNeighbour[0]].children[randomNeighbour[1] + 1].classList.add("wall");
            }
        } else if (currentCell[0] > randomNeighbour[0]) {
            if (randomNeighbour[0] + 1 < trLength) {
                trNodes[randomNeighbour[0] + 1].children[randomNeighbour[1]].classList.add("wall");
            }
        }
    }

    plotCorners(trNodes: any, trLength: number, tdLength: number) {
        const min = tdLength > trLength ? trLength : tdLength;

        for (let i = 0; i < tdLength; i++) {
            trNodes[0].children[i].classList.add("wall");
            trNodes[trLength - 1].children[i].classList.add("wall");
        }

        for (let i = 0; i < trLength; i++) {
            trNodes[i].children[0].classList.add("wall");
            trNodes[i].children[tdLength - 1].classList.add("wall");
        }
    }

    plotOnGraph() {
        const trNodes = this.array.children;
        const trLength = trNodes.length;
        const tdLength = trNodes[0].children.length;

        const stack: Array<any> = [];
        const visited: Set<string> = new Set([]);

        const i = this.startIndex[0];
        const j = this.startIndex[1];

        let currentCell = [i, j];

        this.plotCorners(trNodes, trLength, tdLength);

        visited.add(currentCell.toString());

        stack.push(currentCell);

        let isVisited = false;

        while (stack.length) {
            const temp = stack.pop();

            if (temp) {
                currentCell = temp;
                const randomNeighbour = this.getRandomNeighbour(
                    currentCell[0],
                    currentCell[1],
                    trLength,
                    tdLength,
                    visited
                );

                if (randomNeighbour !== -1) {
                    isVisited = true;
                    stack.push(currentCell);

                    this.removeWalls(randomNeighbour, currentCell, trNodes, trLength, tdLength);

                    visited.add(randomNeighbour.toString());

                    stack.push(randomNeighbour);
                }
            }
        }
    }
}
