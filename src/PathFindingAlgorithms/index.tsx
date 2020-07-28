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

    constructor(
        grid: HTMLTableSectionElement,
        source: [number, number],
        destination: [number, number]
    ) {
        this.grid = grid;
        this.source = source;
        this.destination = destination;
        this.trNodes = this.grid.children;
        this.rows = this.trNodes.length;
        this.cols = this.trNodes[0].children.length;
        this.maxInt = Number.MAX_SAFE_INTEGER;
        this.weightNode = 15;
        this.defaultWeight = 1;
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

    plotShortestRoute(shortestRoute: any) {
        let result = shortestRoute;

        if (result) {
            while (result && result.getParent()) {
                const coordinates = result.getCoordinates();

                this.trNodes[coordinates.x].children[coordinates.y].classList.add("route");
                result = result.getParent();
            }
        }
    }
}
