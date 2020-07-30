import MazeGeneration from ".";
import { shuffle, WEIGHT, trWidth, trHeight } from "../commonUtilities";
import weight from "../assets/weight.svg";

export default class RandomWeight extends MazeGeneration {
    private readonly randomWallsLength: number;

    constructor(grid: HTMLTableSectionElement) {
        super(grid);
        this.randomWallsLength = Math.round(this.rows * this.cols * this.randomNodesPercentage);
    }

    plotOnGraph() {
        const arr = [];

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push([i, j]);
            }
        }
        shuffle(arr);

        for (let i = 0; i < this.randomWallsLength; i++) {
            const item = arr[i];

            if (
                (item[0] === this.source[0] && item[1] === this.source[1]) ||
                (item[0] === this.destination[0] && item[1] === this.destination[1])
            ) {
                continue;
            } else {
                this.grid.children[item[0]].children[item[1]].classList.add(WEIGHT);
                const imgElement = document.createElement("img");

                imgElement.setAttribute("src", weight);
                imgElement.setAttribute("width", (trWidth - 5).toString());
                imgElement.setAttribute("height", (trHeight - 5).toString());

                this.grid.children[item[0]].children[item[1]].appendChild(imgElement);
            }
        }
    }
}
