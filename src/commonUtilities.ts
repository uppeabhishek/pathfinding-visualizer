export const getRandom = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export function clearRoute() {
    const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

    if (tbody) {
        for (let i = 0; i < tbody.children.length; i++) {
            const tr = tbody.children[i];

            for (let j = 0; j < tr.children.length; j++) {
                if (tr.children[j].classList.contains("route")) {
                    tr.children[j].classList.remove("route");
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
                if (tr.children[j].classList.contains("weight")) {
                    tr.children[j].innerHTML = "";
                    tr.children[j].classList.remove("weight");
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
                if (tr.children[j].classList.contains("wall")) {
                    tr.children[j].classList.remove("wall");
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
                if (tr.children[j].classList.contains("searching")) {
                    tr.children[j].classList.remove("searching");
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
                    tr.children[j].classList.contains("route") ||
                    tr.children[j].classList.contains("wall") ||
                    tr.children[j].classList.contains("searching")
                ) {
                    tr.children[j].classList.remove("route");
                    tr.children[j].classList.remove("wall");
                    tr.children[j].classList.remove("searching");
                }
                if (tr.children[j].classList.contains("weight")) {
                    tr.children[j].innerHTML = "";
                    tr.children[j].classList.remove("weight");
                }
            }
        }
    }
}
