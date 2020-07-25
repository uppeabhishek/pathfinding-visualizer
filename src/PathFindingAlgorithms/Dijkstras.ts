import { throws } from "assert";
import { HeapAndMap } from "../DataStructures/HeapAndMap";

export class Dijkstras {
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
        return !(x < 0 || y > 0 || x + 1 >= this.rows || y + 1 >= this.cols);
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
            }
        });
        return neigbours;
    }
    
    getShortestRoute() {
        if (!(this.source[0] <= this.rows && this.source[0] > 0 && this.destination[0] <= this.cols && this.destination[0] > 0)) {
            return null;
        }

        const heapMap = new HeapAndMap();

        heapMap.add(this.source[0], this.source[1], 0, null);


        while (!heapMap.isEmpty()) {

            const currentNode = heapMap.extractMin();

            if (currentNode) { 

                const coordinates = currentNode.getCoordinates();

                if (coordinates.x === this.destination[1] && coordinates.y === this.destination[1]) {
                    break;
                }
                
                const neighbours = this.getNeighbours(heapMap, coordinates.x, coordinates.y);
                
                neighbours.forEach((neighbour) => {
                    console.log(neighbour);
                    // const node = heapMap.getNode(neighbour[0], neighbour[1]);
                    // if (node) {
                    //     node.setDistance(currentNode.getDistance()+1);
                    // }
                    // else {
                    //     heapMap.add(neighbour[0], neighbour[1], currentNode.getDistance()+1, currentNode);
                    // }
                });
            }

        }
    }

    plotShortestRoute() {
        this.getShortestRoute();
    }
}