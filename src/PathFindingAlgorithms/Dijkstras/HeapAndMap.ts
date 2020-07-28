import { GenericHeapAndMap } from "../HeapAndMap";

class Node {
    private readonly x: number;

    private readonly y: number;

    private distance: number;

    private parent: Node | null;

    private readonly isWall: boolean;

    private arrayIndex: number;

    private readonly isWeight: boolean;

    constructor(
        x: number,
        y: number,
        distance: number,
        parent: Node | null,
        isWall: boolean,
        arrayIndex: number,
        isWeight: boolean
    ) {
        this.x = x;
        this.y = y;
        this.distance = distance;
        this.parent = parent;
        this.isWall = isWall;
        this.isWeight = isWeight;
        this.arrayIndex = arrayIndex;
    }

    getArrayIndex() {
        return this.arrayIndex;
    }

    setArrayIndex(index: number) {
        this.arrayIndex = index;
    }

    getDistance() {
        return this.distance;
    }

    getCoordinates() {
        return { x: this.x, y: this.y };
    }

    setDistance(distance: number) {
        this.distance = distance;
    }

    setParent(parent: Node | null) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }

    containsWall() {
        return this.isWall;
    }

    containsWeight() {
        return this.isWeight;
    }
}

export class HeapAndMap extends GenericHeapAndMap {
    private readonly dict: { [key: string]: Node };

    constructor() {
        super();
        this.dict = {};
    }

    add(
        x: number,
        y: number,
        distance: number,
        parent: Node | null,
        isWall = false,
        isWeight = false
    ) {
        const node = new Node(x, y, distance, parent, isWall, this.array.length, isWeight);

        this.array.push(node);

        this.dict[this.getKeyNotation(x, y)] = node;

        let { length } = this.array;

        let swapIndex = length - 1;

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

    contains(x: number, y: number) {
        return this.getKeyNotation(x, y) in this.dict;
    }

    getNode(x: number, y: number) {
        if (this.contains(x, y)) {
            return this.dict[this.getKeyNotation(x, y)];
        }

        return null;
    }

    extractMin() {
        if (this.isEmpty()) {
            return null;
        }

        const firstElement = this.array[0];

        delete this.dict[
            this.getKeyNotation(firstElement.getCoordinates().x, firstElement.getCoordinates().y)
        ];

        const lastElement = this.array.pop();

        if (this.array.length && lastElement) {
            this.array[0] = lastElement;
        } else {
            // Array is empty after popping last element
            return firstElement;
        }

        let index = 0;

        while (index < this.array.length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;

            if (leftChildIndex >= this.array.length) {
                break;
            }

            if (rightChildIndex >= this.array.length) {
                if (this.compareAndSwapElements(index, leftChildIndex) !== false) {
                    index = leftChildIndex;
                } else {
                    break;
                }
            } else if (
                this.array[leftChildIndex].getDistance() <=
                this.array[rightChildIndex].getDistance()
            ) {
                if (this.compareAndSwapElements(index, leftChildIndex) !== false) {
                    index = leftChildIndex;
                } else {
                    break;
                }
            } else if (this.compareAndSwapElements(index, rightChildIndex) !== false) {
                index = rightChildIndex;
            } else {
                break;
            }
        }

        return firstElement;
    }
}
