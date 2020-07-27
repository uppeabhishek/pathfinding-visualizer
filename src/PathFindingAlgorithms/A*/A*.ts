import { HeapAndMap } from "./HeapAndMap";
import {getManhattanDistance} from "./HeapAndMap";

export class AStar {
    private readonly grid: HTMLTableSectionElement
    private readonly source: [number, number];
    private readonly destination: [number, number];
    private readonly rows: number;
    private readonly cols: number;
    private readonly trNodes: HTMLCollectionOf<Element>;
    private readonly maxInt: number;

    constructor(grid: HTMLTableSectionElement, source: [number, number], destination: [number, number]) {
        this.grid = grid;
        this.source = source;
        this.destination = destination;
        this.trNodes = this.grid.children;
        this.rows = this.trNodes.length;
        this.cols = this.trNodes[0].children.length;
        this.maxInt = Number.MAX_SAFE_INTEGER;
    }

    private isValid(x: number, y: number) {
        return !(x < 0 || y < 0 || x >= this.rows || y >= this.cols);
    }

    private getNeighbours(q: HeapAndMap, x: number, y: number) {
        const neigbours: Array<[number, number]> = [];

        const array = [
            {
                x: x-1,
                y: y
            },
            {
                x: x,
                y: y-1
            },
            {
                x: x+1,
                y: y
            },
            {
                x: x,
                y: y+1
            }
        ];
        
        array.forEach((ele) => {
            if (this.isValid(ele.x, ele.y)) {
                neigbours.push([ele.x, ele.y]);
                // const node = q.getNode(ele.x, ele.y);
                // if (node) {
                //     if (!node.containsWall()) {
                //         neigbours.push([ele.x, ele.y]);
                //     }
                // }
            }
        });
        return neigbours;
    }

    getShortestRoute() {

        if (!(this.source[0] <= this.rows && this.source[0] > 0 && this.destination[0] <= this.cols && this.destination[0] > 0)) {
            return null;
        }

        const heapMap = new HeapAndMap({x: this.destination[0], y: this.destination[1]});

        heapMap.add(this.source[0], this.source[1], 0, 0, 0, null, false, true);

        let resultNode;

        let cnt = 0;
        
        while (!heapMap.isEmpty()) {
            const currentNode = heapMap.extractMin();

            console.log(currentNode);

            if (cnt === 100) {
                console.log(cnt);
                break;
            }
            cnt+=1;

            if (currentNode) {
                const coordinates = currentNode.getCoordinates();

                if (coordinates.x === this.destination[0] && coordinates.y === this.destination[1]) {
                    resultNode = currentNode;
                    break;
                }

                const neighbours = this.getNeighbours(heapMap, coordinates.x, coordinates.y);
                neighbours.forEach((neighbour) => {
                    const node = heapMap.getNode(neighbour[0], neighbour[1]);
                    const g = currentNode.getg() + 1;
                    const h = getManhattanDistance({x: neighbour[0], y: neighbour[1]}, {x: this.destination[0], y: this.destination[1]});
                    const f = g + h;
                    if (node) {
                        if (node.getf() < f) {
                            node.setDistance(f);
                            node.setParent(currentNode);
                            heapMap.changePosition(node.getArrayIndex());
                        }
                    }
                    else {
                        heapMap.add(neighbour[0], neighbour[1], f, g, h, currentNode, false);
                    }
                })
            }
        }
    }

    plotShortestRoute() {
        this.getShortestRoute();
    }
}