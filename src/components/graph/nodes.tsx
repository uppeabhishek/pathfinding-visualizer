import React, { FunctionComponent, SyntheticEvent, useRef } from "react";
import { useStyles } from "./styles";

const Nodes: FunctionComponent<{ height: number; width: number }> = ({ height, width }) => {
    const classes = useStyles();

    let trHeight = 30;
    let trWidth = 30;

    const rows = Math.floor(height / trHeight);
    const cols = Math.floor(width / trWidth);

    function tdRowListener(e: SyntheticEvent<HTMLTableDataCellElement>) {
        const currentTargetClassList = e.currentTarget.classList;
        const classes = new Set(e.currentTarget.classList);

        if (classes.has("source") || classes.has("destination")) {
            return;
        }

        if (classes.has("selected")) {
            currentTargetClassList.remove("selected");
        } else {
            currentTargetClassList.add("selected");
        }
    }

    let shouldMouseEnter = false;

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
                    key={`${row}${i}`}
                    className={className}
                    data-id={`${row}${i}`}
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

    const bodyRef = useRef<HTMLTableSectionElement>(null);

    return (
        <table className={classes.table}>
            <tbody ref={bodyRef}>
                <RowNodes />
            </tbody>
        </table>
    );
};

export default Nodes;
