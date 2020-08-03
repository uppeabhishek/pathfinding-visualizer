import { store } from "./store";

export class Animation {
    private readonly nodesToAnimate: Array<[number, number]>;

    private readonly className: string;

    private readonly timeOut: number;

    private prevTimeStamp: number;

    private index: number;

    private animationFrameId: number;

    private readonly trNodes: HTMLCollectionOf<Element>;

    private readonly animatedNodesLength: number;

    private animationCompleted: boolean;

    constructor(
        trNodes: HTMLCollectionOf<Element>,
        nodesToAnimate: Array<[number, number]>,
        className: string
    ) {
        this.nodesToAnimate = nodesToAnimate;
        this.className = className;
        this.timeOut = 2.5 * (100 - store.getState().globals.animationSpeed);
        this.prevTimeStamp = 0;
        this.index = 0;
        this.trNodes = trNodes;
        this.animationFrameId = -1;
        this.animatedNodesLength = nodesToAnimate.length;
        this.animationCompleted = false;

        // Bindings
        this.draw = this.draw.bind(this);
        this.animateNodes = this.animateNodes.bind(this);
        this.performAnimation = this.performAnimation.bind(this);
    }

    private performAnimation() {
        if (this.nodesToAnimate.length) {
            this.trNodes[this.nodesToAnimate[this.index][0]].children[
                this.nodesToAnimate[this.index][1]
            ].classList.add(this.className);
            this.index += 1;
        }
    }

    private draw(timeStamp: number) {
        if (!this.prevTimeStamp || timeStamp - this.prevTimeStamp >= this.timeOut) {
            this.prevTimeStamp = timeStamp;
            this.performAnimation();
        }
        if (this.index < this.animatedNodesLength) {
            this.animationFrameId = requestAnimationFrame(this.draw);
        } else {
            this.animationCompleted = true;
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    animateNodes() {
        return new Promise((resolve) => {
            this.animationFrameId = requestAnimationFrame(this.draw);
            const interval = setInterval(() => {
                if (this.animationCompleted) {
                    clearInterval(interval);
                    resolve("Success");
                }
            }, 0);
        });
    }
}
