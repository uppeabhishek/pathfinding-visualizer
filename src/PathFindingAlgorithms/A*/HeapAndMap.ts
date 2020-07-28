import { GenericHeapAndMap } from "../HeapAndMap";

class Node {
    private readonly x: number;

    private readonly y: number;

    private f: number;

    private g: number;

    private h: number;

    private parent: Node | null;

    private readonly isWall: boolean;

    private arrayIndex: number;

    constructor(
        x: number,
        y: number,
        f: number,
        g: number,
        h: number,
        parent: Node | null,
        isWall: boolean,
        arrayIndex: number
    ) {
        this.x = x;
        this.y = y;
        this.f = f;
        this.g = g;
        this.h = h;
        this.parent = parent;
        this.isWall = isWall;
        this.arrayIndex = arrayIndex;
    }

    getArrayIndex() {
        return this.arrayIndex;
    }

    setArrayIndex(index: number) {
        this.arrayIndex = index;
    }

    getCoordinates() {
        return { x: this.x, y: this.y };
    }

    setParent(parent: Node | null) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }

    setf(f: number) {
        this.f = f;
    }

    seth(h: number) {
        this.h = h;
    }

    setg(g: number) {
        this.g = g;
    }

    getg() {
        return this.g;
    }

    geth() {
        return this.h;
    }

    getf() {
        return this.f;
    }

    getDistance() {
        return this.f;
    }

    containsWall() {
        return this.isWall;
    }
}

// We are using manhattan distance because we are going traversing only four neighbours
export function getManhattanDistance(
    currentCell: { x: number; y: number },
    goalCell: { x: number; y: number }
) {
    return Math.abs(currentCell.x - goalCell.x) + Math.abs(currentCell.y - goalCell.y);
}

export class HeapAndMap extends GenericHeapAndMap {
    private readonly openList: { [key: string]: Node };

    private readonly closedList: { [key: string]: Node };

    constructor() {
        super();
        this.openList = {};
        this.closedList = {};
    }

    add(
        x: number,
        y: number,
        f: number,
        g: number,
        h: number,
        parent: Node | null,
        isWall = false
    ) {
        const node = new Node(x, y, f, g, h, parent, isWall, this.array.length);

        this.array.push(node);

        this.openList[this.getKeyNotation(x, y)] = node;

        let { length } = this.array;

        let swapIndex = length - 1;

        while (length) {
            length = Math.floor((length - 1) / 2);

            const parentIndex = length;

            if (this.array[parentIndex].getf() > f) {
                this.swapElements(parentIndex, swapIndex);
            } else {
                break;
            }
            swapIndex = parentIndex;
        }
    }

    addClosedListNode(x: number, y: number, node: Node) {
        this.closedList[this.getKeyNotation(x, y)] = node;
    }

    getClosedListNode(x: number, y: number): Node {
        return this.closedList[this.getKeyNotation(x, y)];
    }

    private contains(x: number, y: number) {
        return this.getKeyNotation(x, y) in this.openList;
    }

    getOpenListNode(x: number, y: number) {
        if (this.contains(x, y)) {
            return this.openList[this.getKeyNotation(x, y)];
        }

        return null;
    }

    extractMin() {
        if (this.isEmpty()) {
            return null;
        }

        const firstElement = this.array[0];

        delete this.openList[
            this.getKeyNotation(firstElement.getCoordinates().x, firstElement.getCoordinates().y)
        ];

        const lastElement = this.array.pop();

        if (!this.isEmpty() && lastElement) {
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
            } else if (this.array[leftChildIndex].getf() <= this.array[rightChildIndex].getf()) {
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
