export default class RecursiveBackTracker {

    private readonly array: HTMLTableSectionElement;
    private readonly startIndex: [number, number];

    constructor(array: HTMLTableSectionElement, startIndex: [number, number]) {
        this.array = array;
        this.startIndex = startIndex
    }

    plotOnGraph() {
        const trNodes = this.array.children;
        const trLen = trNodes.length;
        const stack = [];
        for (let i = 0; i < trLen; i++) {
            const tdNodes = trNodes[i].children;
            const tdLen = tdNodes.length;

            for (let j = 0; j < tdLen; j++) {
                console.log(tdNodes[j]);
            }
        }
    }
}