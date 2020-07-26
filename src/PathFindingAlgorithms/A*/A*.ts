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

    getShortestRoute() {
        
    }

    plotShortestRoute() {

    }
}