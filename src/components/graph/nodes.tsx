import React, { FunctionComponent, SyntheticEvent, useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useStyles } from "./styles";
import { RootState } from "../../reducers";
import RecursiveBackTracker from "../../MazeGenerationAlgorithms/RecursiveBacktracker";
import RandomizedPrims from "../../MazeGenerationAlgorithms/RandomizedPrims";
import RecursiveDivision from "../../MazeGenerationAlgorithms/RecursiveDivision";
import { BreathFirstSearch } from "../../PathFindingAlgorithms/BreathFirstSearch";
import { Dijkstras } from "../../PathFindingAlgorithms/Dijkstras/Dijkstras";
import { AStar } from "../../PathFindingAlgorithms/A*/A*";
import weight from "../../assets/weight.svg";
import {store} from "../../store";
import {
    clearBoard,
    clearWeights,
    clearRoute,
    clearSearches,
    WALL,
    WEIGHT,
    SOURCE,
    DESTINATION,
    trHeight,
    trWidth
} from "../../commonUtilities";
import RandomMaze from "../../MazeGenerationAlgorithms/RandomMaze";
import RandomWeight from "../../MazeGenerationAlgorithms/RandomWeight";

const Nodes: FunctionComponent<{ height: number; width: number }> = ({ height, width }) => {
    const classes = useStyles();

    const rows = Math.floor(height / trHeight);
    const cols = Math.floor(width / trWidth);

    const keyDownFunc = useRef<(e: any) => void>();

    const keyUpFunc = useRef<(e: any) => void>();

    const mazeType = useSelector((state: RootState) => state.globals.mazeType);

    const algorithm = useSelector((state: RootState) => state.globals.algorithm);

    const vAlgorithm = useSelector((state: RootState) => state.globals.vAlgorithm);

    function tdRowListener(e: SyntheticEvent<HTMLTableDataCellElement>) {
        if (dict.current.wpressed) {
            addWeight(e);

            return;
        }

        const currentTargetClassList = e.currentTarget.classList;
        const classes = new Set(e.currentTarget.classList);

        if (classes.has(SOURCE) || classes.has(DESTINATION) || classes.has(WEIGHT)) {
            return;
        }

        if (classes.has(WALL)) {
            currentTargetClassList.remove(WALL);
        } else {
            currentTargetClassList.add(WALL);
        }
    }

    function tdDragListener(e: SyntheticEvent<HTMLTableDataCellElement>) {
        if (dragType === "source") {
            if (e.currentTarget.classList.contains("destination") || e.currentTarget.classList.contains("wall") || e.currentTarget.classList.contains("weight")) {
                return;
            }
        }
        else if (dragType === "destination") {
            if (e.currentTarget.classList.contains("source") || e.currentTarget.classList.contains("wall") || e.currentTarget.classList.contains("weight")) {
                return;
            }
        }
        previousNode.classList.remove(dragType);
        e.currentTarget.classList.add(dragType);
                
        findShortestPath(false);
        previousNode = e.currentTarget;
    }

    let shouldMouseEnter = false;

    let shouldMouseDrag = false;

    let previousNode: any;

    let dragType: string;
    
    const dict = useRef({ wpressed: false });

    function onMouseDown(e: SyntheticEvent<HTMLTableDataCellElement>) {
        if (e.currentTarget.classList.contains("source")) {
            shouldMouseDrag = true;
            dragType="source";
            previousNode = e.currentTarget;
        }
        else if (e.currentTarget.classList.contains("destination")) {
            shouldMouseDrag = true;
            dragType = "destination";
            previousNode = e.currentTarget;
        }
        else {
            tdRowListener(e);
            shouldMouseEnter = true;
        }
    }

    function onMouseUp() {
        shouldMouseEnter = false;
        shouldMouseDrag = false;
    }

    function onMouseEnter(e: SyntheticEvent<HTMLTableDataCellElement>) {
        if (shouldMouseEnter) {
            tdRowListener(e);
        }
        if (shouldMouseDrag) {
            tdDragListener(e);
        }
    }

    function addWeight(e: SyntheticEvent) {
        const currentTargetClassList = e.currentTarget.classList;
        const classes = new Set(e.currentTarget.classList);

        if (classes.has(SOURCE) || classes.has(DESTINATION)) {
            return;
        }

        e.currentTarget.className = "";

        if (!classes.has(WEIGHT)) {
            const imgElement = document.createElement("img");

            imgElement.setAttribute("src", weight);
            imgElement.setAttribute("width", trWidth.toString());
            imgElement.setAttribute("height", trHeight.toString());

            e.currentTarget.appendChild(imgElement);

            currentTargetClassList.add(WEIGHT);
        } else {
            e.currentTarget.innerHTML = "";
            currentTargetClassList.remove(WEIGHT);
        }
    }

    const borderRadius = 1;

    const currenttrWidth = trWidth - borderRadius * 4;
    const currenttrHeight = trHeight - borderRadius * 4;

    const ColNodes: FunctionComponent<{ row: number }> = ({ row }) => {
        const res = [];
        const isMiddle = row === Math.floor(rows / 2);
        const startNode = Math.floor(cols / 4);
        const endNode = startNode * 3;

        let className = "";

        for (let i = 0; i < cols; i++) {
            if (isMiddle) {
                if (startNode === i) {
                    className = SOURCE;
                } else if (endNode === i) {
                    className = DESTINATION;
                } else {
                    className = "";
                }
            }
            res.push(
                <td
                    key={`${row}-${i}`}
                    className={className}
                    data-id={`${row}-${i}`}
                    style={{
                        width: currenttrWidth,
                        height: currenttrHeight,
                        border: `${borderRadius}px solid blue`
                    }}
                    onMouseDown={onMouseDown}
                    onMouseEnter={onMouseEnter}
                    onMouseUp={onMouseUp}
                />
            );
        }

        return <>{res}</>;
    };

    const RowNodes: FunctionComponent = () => {
        const res = [];

        for (let i = 0; i < rows; i++) {
            res.push(
                <tr key={i}>
                    <ColNodes row={i} />
                </tr>
            );
        }

        return <>{res}</>;
    };

    useEffect(() => {
        if (bodyRef.current) {
            clearBoard();
            if (mazeType === "recursiveBackTracker") {
                const recursiveBacktracker = new RecursiveBackTracker(bodyRef.current, [0, 0]);

                recursiveBacktracker.plotOnGraph();
            } else if (mazeType === "randomizedPrims") {
                const randomizedPrims = new RandomizedPrims(bodyRef.current, [0, 0]);

                randomizedPrims.plotOnGraph();
            } else if (mazeType === "recursiveDivision") {
                const recursiveDivision = new RecursiveDivision(bodyRef.current);

                recursiveDivision.plotOnGraph();
            } else if (mazeType === "randomMaze") {
                const randomMaze = new RandomMaze(bodyRef.current);

                randomMaze.plotOnGraph();
            } else if (mazeType === "randomWeights") {
                const randomWeight = new RandomWeight(bodyRef.current);

                randomWeight.plotOnGraph();
            }
        }
    }, [mazeType]);

    useEffect(() => {
        const unWeightAlgorithms = new Set(["BFS"]);

        clearRoute();
        clearSearches();

        if (unWeightAlgorithms.has(algorithm)) {
            clearWeights();

            // @ts-ignore
            window.removeEventListener("keydown", keyDownFunc.current);

            // @ts-ignore
            window.removeEventListener("keyup", keyUpFunc.current);
        } else {
            // @ts-ignore
            window.addEventListener("keydown", keyDownFunc.current);

            // @ts-ignore
            window.addEventListener("keyup", keyUpFunc.current);
        }
    }, [algorithm]);

    function findShortestPath(animation = true) {
        
        const algorithm = store.getState().globals.algorithm;

        if (bodyRef.current) {
            const documentSource = document.querySelector(".source") as HTMLElement;
            const documentDestination = document.querySelector(".destination") as HTMLElement;

            const source: [number, number] = [0, 0];
            const destination: [number, number] = [0, 0];

            if (documentSource && documentSource.dataset.id) {
                const [x, y] = documentSource.dataset.id.split("-");

                source[0] = parseInt(x);
                source[1] = parseInt(y);
            }

            if (documentDestination && documentDestination.dataset.id) {
                const [x, y] = documentDestination.dataset.id.split("-");

                destination[0] = parseInt(x);
                destination[1] = parseInt(y);
            }

            if (algorithm === "BFS") {
                const BFS = new BreathFirstSearch(bodyRef.current, source, destination, animation);

                BFS.plotShortestRoute();
            } else if (algorithm === "Dijkstra's") {
                const Dijkstra = new Dijkstras(bodyRef.current, source, destination, animation);

                Dijkstra.plotShortestRoute();
            } else if (algorithm === "AStar") {
                const AS = new AStar(bodyRef.current, source, destination, animation);

                AS.plotShortestRoute();
            }
        }
    }

    useEffect(() => {
        findShortestPath();
    }, [vAlgorithm]);

    useEffect(() => {
        keyDownFunc.current = (e: any) => {
            // W and w
            if (e.keyCode === 119 || e.keyCode === 87) {
                dict.current.wpressed = true;
                e.preventDefault();
            }
        };

        keyUpFunc.current = (e: any) => {
            dict.current.wpressed = false;
            e.preventDefault();
        };
    }, []);

    const bodyRef = useRef<HTMLTableSectionElement>(null);

    return useMemo(
        () => (
            <table className={classes.table}>
                <tbody ref={bodyRef}>
                    <RowNodes key="constant" />
                </tbody>
            </table>
        ),
        []
    );
};

export default Nodes;
