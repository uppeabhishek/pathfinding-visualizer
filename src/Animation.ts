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


    constructor(trNodes: HTMLCollectionOf<Element>, nodesToAnimate: Array<[number, number]>, className: string) {
        this.nodesToAnimate = nodesToAnimate;
        this.className = className;
        this.timeOut = store.getState().globals.animationSpeed;
        this.prevTimeStamp = 0;
        this.index = 0;
        this.trNodes = trNodes;
        this.animationFrameId = -1;
        this.animatedNodesLength = nodesToAnimate.length;
        
        // Bindings
        this.draw = this.draw.bind(this);
        this.animateNodes = this.animateNodes.bind(this);
        this.performAnimation = this.performAnimation.bind(this);
    }

    private performAnimation() {
        this.trNodes[this.nodesToAnimate[this.index][0]].children[this.nodesToAnimate[this.index][1]].classList.add(this.className);
        this.index+=1;
    }

    private draw(timeStamp: number) {
        if(!this.prevTimeStamp || timeStamp - this.prevTimeStamp >= this.timeOut) {
            this.prevTimeStamp = timeStamp;
            this.performAnimation();
        }
        if (this.index < this.animatedNodesLength) {
            this.animationFrameId = requestAnimationFrame(this.draw);
            return;
        }
        else {
            cancelAnimationFrame(this.animationFrameId)
        }
        return;
    }

    animateNodes() {
        this.animationFrameId = requestAnimationFrame(this.draw);
    }
}



