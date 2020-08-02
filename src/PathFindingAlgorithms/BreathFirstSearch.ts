import { Queue } from "../DataStructures/Queue";
import { PathFindingAlgorithm } from ".";
import { Animation } from "../Animation";
import { WALL, SEARCHING, ROUTE } from "../commonUtilities";

class Node {
    private readonly x: number;

    private readonly y: number;

    private readonly distance: number;

    private readonly parent: [number, number] | null;

    constructor(x: number, y: number, distance: number, parent: [number, number] | null) {
        this.x = x;
        this.y = y;
        this.distance = distance;
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }
}

export class BreathFirstSearch extends PathFindingAlgorithm {
    constructor(
        grid: HTMLTableSectionElement,
        source: [number, number],
        destination: [number, number],
        animation: boolean
    ) {
        super(grid, source, destination, animation);
    }

    async getShortestRoute() {
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
        const array = new Array(this.rows);
        const visited = new Array(this.rows);

        for (let i = 0; i < this.rows; i++) {
            const temp = [];
            const visitedTemp = new Array(this.cols).fill(false);

            for (let j = 0; j < this.cols; j++) {
                const obj = { distance: 0, row: i, col: j };

                if (i === this.source[0] && j === this.destination[0]) {
                    obj.distance = 0;
                }

                if (this.trNodes[i].children[j].classList.contains(WALL)) {
                    visitedTemp[j] = true;
                }
                temp.push(obj);
            }
            visited[i] = visitedTemp;
            array[i] = temp;
        }

        const nodesToAnimate: Array<[number, number]> = [];

        nodesToAnimate.push([this.source[0], this.source[1]]);

        const node = new Node(this.source[0], this.source[1], 0, null);

        const queue = new Queue();

        queue.enqueue(node);

        let res;

        let isPathFound = false;

        while (!queue.isEmpty()) {
            const front = queue.front();

            queue.dequeue();

            const { x, y, distance } = front;

            if (x === this.destination[0] && y === this.destination[1]) {
                isPathFound = true;
                res = front;
                break;
            }

            if (x - 1 > 0 && !visited[x - 1][y]) {
                const node = new Node(x - 1, y, distance + 1, front);

                nodesToAnimate.push([x - 1, y]);

                queue.enqueue(node);
                visited[x - 1][y] = true;
            }

            if (y - 1 > 0 && !visited[x][y - 1]) {
                const node = new Node(x, y - 1, distance + 1, front);

                nodesToAnimate.push([x, y - 1]);

                queue.enqueue(node);
                visited[x][y - 1] = true;
            }

            if (x + 1 < this.rows && !visited[x + 1][y]) {
                const node = new Node(x + 1, y, distance + 1, front);

                nodesToAnimate.push([x + 1, y]);

                queue.enqueue(node);
                visited[x + 1][y] = true;
            }

            if (y + 1 < this.cols && !visited[x][y + 1]) {
                const node = new Node(x, y + 1, distance + 1, front);

                nodesToAnimate.push([x, y + 1]);

                queue.enqueue(node);
                visited[x][y + 1] = true;
            }
        }

        const animation = new Animation(this.trNodes, nodesToAnimate, SEARCHING);

        await animation.animateNodes();

        const pathNodes = [];

        if (isPathFound) {
            while (res.parent) {
                pathNodes.push([res.x, res.y]);
                res = res.parent;
            }

            return pathNodes;
        }

        return false;
    }

    async plotShortestRoute() {
        const res = await this.getShortestRoute();

        const nodesToAnimate: Array<[number, number]> = [];

        if (res) {
            res.forEach((ele) => {
                nodesToAnimate.unshift([ele[0], ele[1]]);
            });
            const animation = new Animation(this.trNodes, nodesToAnimate, ROUTE);

            animation.animateNodes();
        }
    }
}
