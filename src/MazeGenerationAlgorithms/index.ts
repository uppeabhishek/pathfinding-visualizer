export default class MazeGeneration {
    protected readonly grid: HTMLTableSectionElement;

    protected readonly rows: number;

    protected readonly cols: number;

    protected readonly randomNodesPercentage: number;

    protected readonly source: Array<number>;

    protected readonly destination: Array<number>;

    constructor(grid: HTMLTableSectionElement) {
        this.grid = grid;
        this.rows = grid.children.length;
        this.cols = grid.children[0].children.length;
        this.randomNodesPercentage = 0.2;

        const source = document.querySelector(".source") as HTMLElement;
        const destination = document.querySelector(".destination") as HTMLElement;

        this.source = [0, 0];
        this.destination = [0, 0];

        if (source && source.dataset.id) {
            this.source = source.dataset.id.split("-").map((ele: string) => parseInt(ele));
        }

        if (destination && destination.dataset.id) {
            this.destination = destination.dataset.id
                .split("-")
                .map((ele: string) => parseInt(ele));
        }
    }
}
