import { throws } from "assert";
import { Animation } from "../Animation";
import { ROUTE } from "../commonUtilities";

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

    async plotShortestRoute(shortestRoute: any) {
        let result = shortestRoute;

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
