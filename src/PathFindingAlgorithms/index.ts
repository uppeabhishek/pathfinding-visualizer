import { Animation } from "../Animation";
import { ROUTE, WALL } from "../commonUtilities";
import { Queue } from "../DataStructures/Queue";

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

export class PathFindingAlgorithm {
    protected readonly grid: HTMLTableSectionElement;

    protected readonly source: [number, number];

    protected readonly destination: [number, number];

    protected readonly rows: number;

    protected readonly cols: number;

    protected readonly trNodes: HTMLCollectionOf<Element>;

    protected readonly maxInt: number;

    protected readonly weightNode: number;

    protected readonly defaultWeight: number;

    protected readonly animation: boolean;

    constructor(
        grid: HTMLTableSectionElement,
        source: [number, number],
        destination: [number, number],
        animation: boolean
    ) {
        this.grid = grid;
        this.source = source;
        this.destination = destination;
        this.trNodes = this.grid.children;
        this.rows = this.trNodes.length;
        this.cols = this.trNodes[0].children.length;
        this.maxInt = Number.MAX_SAFE_INTEGER;
        this.weightNode = 10;
        this.defaultWeight = 1;
        this.animation = animation;
    }

    protected isValid(x: number, y: number) {
        return !(x < 0 || y < 0 || x >= this.rows || y >= this.cols);
    }

    protected getNeigbourCoordinates(x: number, y: number) {
        const array = [
            {
                x: x - 1,
                y
            },
            {
                x,
                y: y - 1
            },
            {
                x: x + 1,
                y
            },
            {
                x,
                y: y + 1
            }
        ];

        return array;
    }

    isDestinationReachable() {
        let rechable = false;

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
        }

        const node = new Node(this.source[0], this.source[1], 0, null);

        const queue = new Queue();

        queue.enqueue(node);

        while (!queue.isEmpty()) {
            const front = queue.front();

            queue.dequeue();

            const { x, y, distance } = front;

            if (x === this.destination[0] && y === this.destination[1]) {
                rechable = true;
                break;
            }

            if (x - 1 >= 0 && !visited[x - 1][y]) {
                const node = new Node(x - 1, y, distance + 1, front);

                queue.enqueue(node);
                visited[x - 1][y] = true;
            }

            if (y - 1 >= 0 && !visited[x][y - 1]) {
                const node = new Node(x, y - 1, distance + 1, front);

                queue.enqueue(node);
                visited[x][y - 1] = true;
            }

            if (x + 1 < this.rows && !visited[x + 1][y]) {
                const node = new Node(x + 1, y, distance + 1, front);

                queue.enqueue(node);
                visited[x + 1][y] = true;
            }

            if (y + 1 < this.cols && !visited[x][y + 1]) {
                const node = new Node(x, y + 1, distance + 1, front);

                queue.enqueue(node);
                visited[x][y + 1] = true;
            }
        }

        return rechable;
    }

    async plotShortestRoute(shortestRoute: any) {
        let result = shortestRoute;
        console.log(result);

        const nodesToAnimate: Array<[number, number]> = [];

        if (result) {
            while (result && result.getParent()) {
                const coordinates = result.getCoordinates();

                nodesToAnimate.unshift([coordinates.x, coordinates.y]);
                result = result.getParent();
            }
        }

        if (this.animation) {
            const animation = new Animation(this.trNodes, nodesToAnimate, ROUTE);

            await animation.animateNodes();
        } else {
            nodesToAnimate.forEach((ele) => {
                this.trNodes[ele[0]].children[ele[1]].classList.add(ROUTE);
            });
        }
    }
}
