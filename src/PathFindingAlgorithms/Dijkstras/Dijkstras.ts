import { HeapAndMap } from "./HeapAndMap";
import { PathFindingAlgorithm } from "..";

export class Dijkstras extends PathFindingAlgorithm {
    constructor(
        grid: HTMLTableSectionElement,
        source: [number, number],
        destination: [number, number]
    ) {
        super(grid, source, destination);
    }

    private getNeighbours(q: HeapAndMap, x: number, y: number) {
        const neigbours: Array<[number, number]> = [];

        const array = this.getNeigbourCoordinates(x, y);

        array.forEach((ele) => {
            if (this.isValid(ele.x, ele.y)) {
                const node = q.getNode(ele.x, ele.y);

                if (node) {
                    if (!node.containsWall()) {
                        neigbours.push([ele.x, ele.y]);
                    }
                }
            }
        });

        return neigbours;
    }

    getShortestRoute() {
        if (
            !(
                this.source[0] <= this.rows &&
                this.source[0] > 0 &&
                this.destination[0] <= this.cols &&
                this.destination[0] > 0
            )
        ) {
            return null;
        }

        const heapMap = new HeapAndMap();

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.trNodes[i].children[j].classList.contains("selected")) {
                    heapMap.add(i, j, this.maxInt, null, true);
                } else if (this.source[0] === i && this.source[1] === j) {
                    heapMap.add(i, j, 0, null);
                } else {
                    heapMap.add(i, j, this.maxInt, null);
                }
            }
        }

        let resultNode;

        while (!heapMap.isEmpty()) {
            const currentNode = heapMap.extractMin();

            if (currentNode) {
                const coordinates = currentNode.getCoordinates();

                if (
                    coordinates.x === this.destination[0] &&
                    coordinates.y === this.destination[1]
                ) {
                    resultNode = currentNode;
                    break;
                }

                const neighbours = this.getNeighbours(heapMap, coordinates.x, coordinates.y);

                neighbours.forEach((neighbour) => {
                    const node = heapMap.getNode(neighbour[0], neighbour[1]);

                    if (node) {
                        node.setDistance(currentNode.getDistance() + 1);
                        node.setParent(currentNode);
                        heapMap.changePosition(node.getArrayIndex());
                    }
                });
            }
        }

        return resultNode;
    }

    plotShortestRoute() {
        super.plotShortestRoute(this.getShortestRoute());
    }
}
