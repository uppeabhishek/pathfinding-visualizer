class Node {
    private readonly x: number;
    private readonly y: number;
    private f: number;
    private readonly g: number;
    private readonly h: number;    
    private parent: Node | null;
    private readonly isWall: boolean;
    private arrayIndex: number;

    constructor(x: number, y: number, f: number, g: number, h: number, parent: Node | null, isWall: boolean, arrayIndex: number) {
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
        return {x: this.x, y: this.y};
    }

    setParent(parent: Node | null) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }

    setDistance(f: number) {
        this.f = f; 
    }

    getg() {
        return this.f;
    }

    geth() {
        return this.h
    }

    getf() {
        return this.f;
    }

    containsWall() {
        return this.isWall;
    }
}

// We are using manhattan distance because we are going traversing only four neighbours
export function getManhattanDistance(currentCell: {x: number,y: number}, goalCell: {x: number, y: number}) {
    return Math.abs(currentCell.x - goalCell.x) 
        +  Math.abs(currentCell.y - goalCell.y);
}

export class HeapAndMap {
    private readonly array: Array<Node>;
    private readonly dict: {[key: string]: Node};
    private readonly goal: {x: number, y: number}

    constructor(goal: {x: number, y: number}) {
        this.goal = goal;
        this.array = [];
        this.dict = {};
    }

    private swapElements(index: number, indexToSwap: number) {
        const temp = this.array[index];

        const tempIndex = this.array[index].getArrayIndex();

        this.array[index].setArrayIndex(this.array[indexToSwap].getArrayIndex());

        this.array[index] = this.array[indexToSwap];

        this.array[indexToSwap].setArrayIndex(tempIndex);

        this.array[indexToSwap] = temp;
    }

    add(x: number, y: number,f: number, g: number, h: number,  parent: Node | null, isWall: boolean = false, source: boolean = false) {

        let node = new Node(x, y, f,g, h, parent, isWall, this.array.length);

        this.array.push(node);

        this.dict[this.getKeyNotation(x,y)] = node;
        
        let length = this.array.length;

        let swapIndex = length-1;
        
        while (length) {

            length = Math.floor((length - 1) / 2);

            const parentIndex = length;
        
            if (this.array[parentIndex].getf() > f) {  
                this.swapElements(parentIndex, swapIndex);
            }
            else {
                break;
            }
            swapIndex = parentIndex;
        }
    }

    changePosition(index: number) {

        let length = index;
        let swapIndex = length;

        try{
            let distance = this.array[index].getf();

            while (length) {

                length = Math.floor((length - 1) / 2);
    
                const parentIndex = length;
                
                if (this.array[parentIndex].getf() > distance) {  
                    this.swapElements(parentIndex, swapIndex);
                }
                else {
                    break;
                }
                swapIndex = parentIndex;
            }
        }
        catch(e) {
            console.log(index);
        }

    }

    private compareAndSwapElements(index: number, leftRightIndex: number) {
        if (this.array[index].getf() > this.array[leftRightIndex].getf()) {
            this.swapElements(index, leftRightIndex);
            return leftRightIndex;
        }
        return false;
    }

    getKeyNotation(x: number, y: number) {
        return x.toString() + "-" + y.toString();
    }

    contains(x: number, y: number) {
        return this.getKeyNotation(x,y) in this.dict;
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

        delete this.dict[this.getKeyNotation(firstElement.getCoordinates().x, firstElement.getCoordinates().y)];

        const lastElement = this.array.pop();
        
        if (this.array.length && lastElement) {
            this.array[0] = lastElement;
        }
        else {
            // Array is empty after popping last element
            return firstElement;
        }

        let index = 0;

        while (index < this.array.length) {

            const leftChildIndex = (2 * index) + 1;
            const rightChildIndex = (2 * index) + 2;
            
            if (leftChildIndex >= this.array.length) {
                break;
            }

            if (rightChildIndex >= this.array.length) {
                if (this.compareAndSwapElements(index, leftChildIndex)!==false) {
                    index = leftChildIndex;
                }
                else {
                    break;
                }
            }
            else {
                if (this.array[leftChildIndex].getf() <= this.array[rightChildIndex].getf()) {
                    if (this.compareAndSwapElements(index, leftChildIndex) !== false) {
                        index = leftChildIndex;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.compareAndSwapElements(index, rightChildIndex) !== false) {
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