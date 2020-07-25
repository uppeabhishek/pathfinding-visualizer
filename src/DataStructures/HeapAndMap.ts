class Node {
    private readonly x: number;
    private readonly y: number;
    private readonly distance: number;

    constructor(x: number, y: number, distance: number) {
        this.x = x;
        this.y = y;
        this.distance = distance;
    }

    getDistance() {
        return this.distance;
    }
}

export class HeapAndMap {
    private readonly array: Array<Node>;
    private readonly set: Set<string>;
    private readonly parentDict: {};
    constructor() {
        this.array = [];
        this.set = new Set();
        this.parentDict = {};
    }

    add(x: number, y: number, distance: number) {
        let node = new Node(x, y, distance);

        this.array.push(node);

        this.set.add(x.toString() + "_" + y.toString());
        
        let length = this.array.length;
        
        while (length) {

            length = Math.floor(length / 2);

            const parentIndex = Math.floor(length);
            
            if (this.array[parentIndex].getDistance() > distance) {
                [this.array[parentIndex], node] = [node, this.array[parentIndex]] 
            }
            else {
                break;
            }
        }
    }

    private compareAndSwapElements(index: number, leftRightIndex: number) {
        if (this.array[index].getDistance() > this.array[leftRightIndex].getDistance()) {
            [this.array[index], this.array[leftRightIndex]] = [this.array[leftRightIndex], this.array[index]];
            return leftRightIndex;
        }
        return false;
    }

    contains(x: number, y: number) {
        return this.set.has(x.toString() + "_" + y.toString());
    }

    extractMin() {
        if (this.isEmpty()) {
            return -1;
        }

        const firstElement = this.array[0];
        const lastElement = this.array.pop();
        
        if (lastElement) {
            this.array[0] = lastElement;
        }

        let index = 0;

        while (index < this.array.length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            
            if (leftChildIndex >= this.array.length) {
                break;
            }

            if (rightChildIndex >= this.array.length) {
                if (this.compareAndSwapElements(index, leftChildIndex)) {
                    index = leftChildIndex;
                }
                else {
                    break;
                }
            }
            else {
                if (this.array[leftChildIndex] < this.array[rightChildIndex]) {
                    if (this.compareAndSwapElements(index, leftChildIndex)) {
                        index = leftChildIndex;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.compareAndSwapElements(index, rightChildIndex)) {
                        index = rightChildIndex;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        return firstElement;
    }

    isEmpty() {
        return this.array.length === 0;
    }
}