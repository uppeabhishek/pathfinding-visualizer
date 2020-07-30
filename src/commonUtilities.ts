export const getRandom = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const WALL = "wall";
export const SEARCHING = "searching";
export const ROUTE = "route";
export const WEIGHT = "weight";
export const SOURCE = "source";
export const DESTINATION = "destination";

export const trHeight = 30;
export const trWidth = 30;

export function clearRoute() {
    const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

    if (tbody) {
        for (let i = 0; i < tbody.children.length; i++) {
            const tr = tbody.children[i];

            for (let j = 0; j < tr.children.length; j++) {
                if (tr.children[j].classList.contains(ROUTE)) {
                    tr.children[j].classList.remove(ROUTE);
                }
            }
        }
    }
}

export function clearWeights() {
    const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

    if (tbody) {
        for (let i = 0; i < tbody.children.length; i++) {
            const tr = tbody.children[i];

            for (let j = 0; j < tr.children.length; j++) {
                if (tr.children[j].classList.contains(WEIGHT)) {
                    tr.children[j].innerHTML = "";
                    tr.children[j].classList.remove(WEIGHT);
                }
            }
        }
    }
}

export function clearWalls() {
    const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

    if (tbody) {
        for (let i = 0; i < tbody.children.length; i++) {
            const tr = tbody.children[i];

            for (let j = 0; j < tr.children.length; j++) {
                if (tr.children[j].classList.contains(WALL)) {
                    tr.children[j].classList.remove(WALL);
                }
            }
        }
    }
}

export function clearSearches() {
    const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

    if (tbody) {
        for (let i = 0; i < tbody.children.length; i++) {
            const tr = tbody.children[i];

            for (let j = 0; j < tr.children.length; j++) {
                if (tr.children[j].classList.contains(SEARCHING)) {
                    tr.children[j].classList.remove(SEARCHING);
                }
            }
        }
    }
}

export function clearBoard() {
    const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

    if (tbody) {
        for (let i = 0; i < tbody.children.length; i++) {
            const tr = tbody.children[i];

            for (let j = 0; j < tr.children.length; j++) {
                if (
                    tr.children[j].classList.contains(ROUTE) ||
                    tr.children[j].classList.contains(WALL) ||
                    tr.children[j].classList.contains(SEARCHING)
                ) {
                    tr.children[j].classList.remove(ROUTE);
                    tr.children[j].classList.remove(WALL);
                    tr.children[j].classList.remove(SEARCHING);
                }
                if (tr.children[j].classList.contains(WEIGHT)) {
                    tr.children[j].innerHTML = "";
                    tr.children[j].classList.remove(WEIGHT);
                }
            }
        }
    }
}

export function shuffle(arr: Array<any>) {
    const le = arr.length;

    for (let i = le - 1; i > 0; i--) {
        const rI = getRandom(0, i - 1);

        [arr[i], arr[rI]] = [arr[rI], arr[i]];
    }

    return arr;
}
