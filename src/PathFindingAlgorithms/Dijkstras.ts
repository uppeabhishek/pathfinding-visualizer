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
            }
        });
        return neigbours;
    }
    
    getShortestRoute() {
        if (!(this.source[0] <= this.rows && this.source[0] > 0 && this.destination[0] <= this.cols && this.destination[0] > 0)) {
            return null;
        }

        const heapMap = new HeapAndMap();

        for (let i=0; i<this.rows; i++) {
            for (let j=0;j<this.cols;j++) {
                if (this.trNodes[i].children[j].classList.contains("selected")) {
                    heapMap.add(i, j, this.maxInt, null, true);
                }
                else {
                    if (this.source[0] === i && this.source[1] === j){
                        console.log(this.source, i, j)
                        heapMap.add(i, j, 0, null);
                    }
                    else {
                        heapMap.add(i, j, this.maxInt, null);
                    }
                }
            }
        }

        let cnt = 0;

        let resultNode;

        let previousNode;

        while (!heapMap.isEmpty()) {

            cnt+=1;
            if (cnt === 1000) {
                break;
            }

            const currentNode = heapMap.extractMin();

            if (currentNode) {
                const coordinates = currentNode.getCoordinates();

                if (coordinates.x === this.destination[0] && coordinates.y === this.destination[1]) {
                    console.log(previousNode);
                    resultNode = currentNode;
                    break;
                }
                
                const neighbours = this.getNeighbours(heapMap, coordinates.x, coordinates.y);
                
                neighbours.forEach((neighbour) => {
                    const node = heapMap.getNode(neighbour[0], neighbour[1]);
                    if (node) {
                        node.setDistance(currentNode.getDistance()+1);
                        node.setParent(currentNode);
                    }
                });

                previousNode = currentNode;
            }
        }
        console.log(resultNode);
    }

    plotShortestRoute() {
        this.getShortestRoute();
    }
}