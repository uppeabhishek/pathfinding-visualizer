export class Queue {
    private readonly elements: Array<any>;

    constructor() {
        this.elements = [];
    }

    enqueue(element: any) {
        this.elements.push(element);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        return this.elements.shift();
    }

    front() {
        if (this.isEmpty()) {
            return null;
        }

        return this.elements[0];
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}
