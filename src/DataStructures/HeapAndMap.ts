class Node {
    private readonly x: number;
    private readonly y: number;
    private distance: number;
    private parent: Node | null;
    private readonly isWall: boolean;
    private arrayIndex: number;

    constructor(x: number, y: number, distance: number,parent: Node | null, isWall: boolean, arrayIndex: number) {
        this.x = x;
        this.y = y;
        this.distance = distance;
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

    getDistance() {
        return this.distance;
    }

    getCoordinates() {
        return {x: this.x, y: this.y};
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
}

export class HeapAndMap {
    private readonly array: Array<Node>;
    private readonly dict: {[key: string]: Node};

    constructor() {
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

    add(x: number, y: number, distance: number, parent: Node | null, isWall: boolean = false) {
        let node = new Node(x, y, distance, parent, isWall, this.array.length);

        this.array.push(node);

        this.dict[this.getKeyNotation(x,y)] = node;
        
        let length = this.array.length;

        let swapIndex = length-1;
        
        while (length) {

            length = Math.floor(length / 2);

            const parentIndex = length;
        
            if (this.array[parentIndex].getDistance() > distance) {  
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
            
            let distance = this.array[index].getDistance();

            while (length) {

                length = Math.floor(length / 2);
    
                const parentIndex = length;
                
                if (this.array[parentIndex].getDistance() > distance) {  
                    this.swapElements(parentIndex, swapIndex);
                }
                else {
                    break;
                }
                swapIndex = parentIndex;
            }
        }
        catch(e){
            console.log(index);
        }

    }

    private compareAndSwapElements(index: number, leftRightIndex: number) {
        if (this.array[index].getDistance() > this.array[leftRightIndex].getDistance()) {
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
        
        if (lastElement) {
            if (this.array.length) {
                this.array[0] = lastElement;
            }
        }

        let index = 0;

        while (index < this.array.length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            
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
                if (this.array[leftChildIndex] < this.array[rightChildIndex]) {
                    if (this.compareAndSwapElements(index, leftChildIndex)!==false) {
                        index = leftChildIndex;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.compareAndSwapElements(index, rightChildIndex)!==false) {
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