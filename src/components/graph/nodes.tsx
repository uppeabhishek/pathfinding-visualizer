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
import { clearBoard, clearWeights } from "../../commonUtilities";

const Nodes: FunctionComponent<{ height: number; width: number }> = ({ height, width }) => {
    const classes = useStyles();

    let trHeight = 30;
    let trWidth = 30;

    const rows = Math.floor(height / trHeight);
    const cols = Math.floor(width / trWidth);

    function tdRowListener(e: SyntheticEvent<HTMLTableDataCellElement>) {
        if (dict.current.wpressed) {
            addWeight(e);

            return;
        }

        const currentTargetClassList = e.currentTarget.classList;
        const classes = new Set(e.currentTarget.classList);

        if (classes.has("source") || classes.has("destination") || classes.has("weight")) {
            return;
        }

        if (classes.has("wall")) {
            currentTargetClassList.remove("wall");
        } else {
            currentTargetClassList.add("wall");
        }
    }

    let shouldMouseEnter = false;

    const dict = useRef({ wpressed: false });

    function onMouseDown(e: SyntheticEvent<HTMLTableDataCellElement>) {
        tdRowListener(e);

        shouldMouseEnter = true;
    }

    function onMouseUp() {
        shouldMouseEnter = false;
    }

    function onMouseEnter(e: SyntheticEvent<HTMLTableDataCellElement>) {
        if (shouldMouseEnter) {
            tdRowListener(e);
        }
    }

    function addWeight(e: SyntheticEvent) {
        const currentTargetClassList = e.currentTarget.classList;
        const classes = new Set(e.currentTarget.classList);

        if (classes.has("source") || classes.has("destination")) {
            return;
        }

        e.currentTarget.className = "";

        if (!classes.has("weight")) {
            const imgElement = document.createElement("img");

            imgElement.setAttribute("src", weight);
            imgElement.setAttribute("width", trWidth.toString());
            imgElement.setAttribute("height", trHeight.toString());

            e.currentTarget.appendChild(imgElement);

            currentTargetClassList.add("weight");
        } else {
            e.currentTarget.innerHTML = "";
            currentTargetClassList.remove("weight");
        }
    }

    const borderRadius = 1;

    trWidth -= borderRadius * 4;
    trHeight -= borderRadius * 4;

    const ColNodes: FunctionComponent<{ row: number }> = ({ row }) => {
        const res = [];
        const isMiddle = row === Math.floor(rows / 2);
        const startNode = Math.floor(cols / 4);
        const endNode = startNode * 3;

        let className = "";
        let text = "";

        for (let i = 0; i < cols; i++) {
            if (isMiddle) {
                if (startNode === i) {
                    className = "source";
                    text = "S";
                } else if (endNode === i) {
                    className = "destination";
                    text = "D";
                } else {
                    className = "";
                    text = "";
                }
            }
            res.push(
                <td
                    key={`${row}-${i}`}
                    className={className}
                    data-id={`${row}-${i}`}
                    style={{
                        width: trWidth,
                        height: trHeight,
                        border: `${borderRadius}px solid blue`
                    }}
                    onMouseDown={onMouseDown}
                    onMouseEnter={onMouseEnter}
                    onMouseUp={onMouseUp}
                >
                    {text}
                </td>
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

    const keyDownFunc = useRef<(e: any) => void>();

    const keyUpFunc = useRef<(e: any) => void>();

    const mazeType = useSelector((state: RootState) => state.globals.mazeType);

    const algorithm = useSelector((state: RootState) => state.globals.algorithm);

    const vAlgorithm = useSelector((state: RootState) => state.globals.vAlgorithm);

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
            }
        }
    }, [mazeType]);

    useEffect(() => {
        const unWeightAlgorithms = new Set(["BFS"]);

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

    useEffect(() => {
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
                const BFS = new BreathFirstSearch(bodyRef.current, source, destination);

                BFS.plotShortestRoute();
            } else if (algorithm === "Dijkstra's") {
                const Dijkstra = new Dijkstras(bodyRef.current, source, destination);

                Dijkstra.plotShortestRoute();
            } else if (algorithm === "AStar") {
                const AS = new AStar(bodyRef.current, source, destination);

                AS.plotShortestRoute();
            }
        }
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
