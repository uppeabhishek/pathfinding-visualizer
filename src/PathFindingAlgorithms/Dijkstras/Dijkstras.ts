import { HeapAndMap } from "./HeapAndMap";
import { PathFindingAlgorithm } from "..";
import { Animation } from "../../Animation";
import { WALL, SEARCHING, WEIGHT, destinationNotReachableResponse } from "../../commonUtilities";

export class Dijkstras extends PathFindingAlgorithm {
    constructor(
        grid: HTMLTableSectionElement,
        source: [number, number],
        destination: [number, number],
        animation: boolean
    ) {
        super(grid, source, destination, animation);
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

    async getShortestRoute() {
        if (
            !(
                this.source[0] < this.rows &&
                this.source[0] >= 0 &&
                this.destination[0] < this.cols &&
                this.destination[0] >= 0
            )
        ) {
            return null;
        }

        const heapMap = new HeapAndMap();

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.trNodes[i].children[j].classList.contains(WEIGHT)) {
                    heapMap.add(i, j, this.maxInt, null, true, true);
                } else if (this.trNodes[i].children[j].classList.contains(WALL)) {
                    heapMap.add(i, j, this.maxInt, null, true);
                } else if (this.source[0] === i && this.source[1] === j) {
                    heapMap.add(i, j, 0, null);
                } else {
                    heapMap.add(i, j, this.maxInt, null);
                }
            }
        }

        let resultNode;

        const nodesToAnimate: Array<[number, number]> = [];

        while (!heapMap.isEmpty()) {
            const currentNode = heapMap.extractMin();

            if (currentNode) {
                const coordinates = currentNode.getCoordinates();

                nodesToAnimate.push([coordinates.x, coordinates.y]);

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
                        node.setDistance(
                            currentNode.getDistance() +
                                (node.containsWeight() ? this.weightNode : this.defaultWeight)
                        );
                        node.setParent(currentNode);
                        heapMap.changePosition(node.getArrayIndex());
                    }
                });
            }
        }

        if (this.animation) {
            const animation = new Animation(this.trNodes, nodesToAnimate, SEARCHING);

            await animation.animateNodes();
        } else {
            nodesToAnimate.forEach((ele) => {
                this.trNodes[ele[0]].children[ele[1]].classList.add(SEARCHING);
            });
        }

        return resultNode;
    }

    async plotShortestRoute() {
        if (!this.isDestinationReachable()) {
            destinationNotReachableResponse();
            return;
        }
        const res = this.getShortestRoute();

        await res;

        res.then((result) => {
            super.plotShortestRoute(result);
        });
    }
}
