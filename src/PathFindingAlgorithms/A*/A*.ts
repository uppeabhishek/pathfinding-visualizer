import { resolve } from "dns";
import { HeapAndMap, getManhattanDistance } from "./HeapAndMap";

import { PathFindingAlgorithm } from "..";

import { Animation } from "../../Animation";
import { WALL, SEARCHING, WEIGHT } from "../../commonUtilities";

export class AStar extends PathFindingAlgorithm {
    constructor(
        grid: HTMLTableSectionElement,
        source: [number, number],
        destination: [number, number],
        animation: boolean
    ) {
        super(grid, source, destination, animation);
    }

    private getNeighbours(q: HeapAndMap, x: number, y: number) {
        const array = this.getNeigbourCoordinates(x, y);
        const neigbours: Array<[number, number]> = [];

        array.forEach((ele) => {
            if (this.isValid(ele.x, ele.y)) {
                const node = q.getOpenListNode(ele.x, ele.y);

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
                this.source[0] <= this.rows &&
                this.source[0] >= 0 &&
                this.destination[0] <= this.cols &&
                this.destination[0] >= 0
            )
        ) {
            return null;
        }

        const heapMap = new HeapAndMap();

        heapMap.add(this.source[0], this.source[1], 0, 0, 0, null, false);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.trNodes[i].children[j].classList.contains(WEIGHT)) {
                    heapMap.add(i, j, this.maxInt, this.maxInt, this.maxInt, null, true, true);
                } else if (this.trNodes[i].children[j].classList.contains(WALL)) {
                    heapMap.add(i, j, this.maxInt, this.maxInt, this.maxInt, null, true);
                } else if (this.source[0] === i && this.source[1] === j) {
                    heapMap.add(i, j, 0, 0, 0, null);
                } else {
                    heapMap.add(i, j, this.maxInt, this.maxInt, this.maxInt, null);
                }
            }
        }

        let cnt = 0;

        let resultNode;

        const nodesToAnimate: Array<[number, number]> = [];

        while (!heapMap.isEmpty()) {
            const currentNode = heapMap.extractMin();

            cnt += 1;

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

                for (const neighbour of neighbours) {
                    const openListNode = heapMap.getOpenListNode(neighbour[0], neighbour[1]);

                    const g =
                        currentNode.getg() +
                        (currentNode.containsWeight() ? this.weightNode : this.defaultWeight);
                    const h = getManhattanDistance(
                        { x: neighbour[0], y: neighbour[1] },
                        { x: this.destination[0], y: this.destination[1] }
                    );
                    const f = g + h;

                    const closedListNode = heapMap.getClosedListNode(neighbour[0], neighbour[1]);

                    if (closedListNode) {
                        continue;
                    }

                    if (openListNode) {
                        if (openListNode.getf() < f) {
                            continue;
                        } else {
                            openListNode.setg(g);
                            openListNode.seth(h);
                            openListNode.setf(f);
                            openListNode.setParent(currentNode);
                            heapMap.changePosition(openListNode.getArrayIndex());
                        }
                    }
                }

                heapMap.addClosedListNode(
                    currentNode.getCoordinates().x,
                    currentNode.getCoordinates().y,
                    currentNode
                );
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
        const res = this.getShortestRoute();

        await res.then(async (result) => {
            await super.plotShortestRoute(result);
        });
    }
}
