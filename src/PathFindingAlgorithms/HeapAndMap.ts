export class GenericHeapAndMap {
    protected readonly array: Array<any>;

    constructor() {
        this.array = [];
    }

    changePosition(index: number) {
        let length = index;
        let swapIndex = length;

        try {
            const distance = this.array[index].getDistance();

            while (length) {
                length = Math.floor((length - 1) / 2);

                const parentIndex = length;

                if (this.array[parentIndex].getDistance() > distance) {
                    this.swapElements(parentIndex, swapIndex);
                } else {
                    break;
                }
                swapIndex = parentIndex;
            }
        } catch (e) {}
    }

    protected swapElements(index: number, indexToSwap: number) {
        const temp = this.array[index];

        const tempIndex = this.array[index].getArrayIndex();

        this.array[index].setArrayIndex(this.array[indexToSwap].getArrayIndex());

        this.array[index] = this.array[indexToSwap];

        this.array[indexToSwap].setArrayIndex(tempIndex);

        this.array[indexToSwap] = temp;
    }

    protected getKeyNotation(x: number, y: number) {
        return `${x.toString()}-${y.toString()}`;
    }

    protected compareAndSwapElements(index: number, leftRightIndex: number) {
        if (this.array[index].getDistance() > this.array[leftRightIndex].getDistance()) {
            this.swapElements(index, leftRightIndex);

            return leftRightIndex;
        }

        return false;
    }

    isEmpty() {
        return this.array.length === 0;
    }
}
