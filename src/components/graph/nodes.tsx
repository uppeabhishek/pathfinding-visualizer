import React, { FunctionComponent, SyntheticEvent } from "react";
import { useStyles } from "./styles";

const Nodes: FunctionComponent<{height: number , width: number}> = ({height, width}) => {
    const classes = useStyles();

    const trWidth = 30, trHeight = 30;

    const rows = Math.floor(height/trHeight), cols = Math.floor(width/trWidth);

    function tdRowListener(e: SyntheticEvent<HTMLTableDataCellElement>) {
        const currentTargetClassList = e.currentTarget.classList;
        const classes = new Set(e.currentTarget.classList);
        if (classes.has("selected")) {
            currentTargetClassList.remove("selected");
        }   
        else {
            currentTargetClassList.add("selected");
        }
    }

    function onMouseMove(e: SyntheticEvent<HTMLTableDataCellElement>) {
        tdRowListener(e);
    }

    function onClick(e: SyntheticEvent<HTMLTableDataCellElement>) {
        tdRowListener(e);
    }

    function onMouseDown(e: SyntheticEvent<HTMLTableDataCellElement>) {
        tdRowListener(e);
        console.log(e.currentTarget);
        // e.currentTarget.addEventListener('onmousemove', () => {
        //     console.log(e);
        //     onMouseMove(e);
        // });
    }

    const ColNodes: FunctionComponent<{row: number}> = ({row}) => {
        const res = [];
        for (let i=0;i<cols; i++) {
            res.push(
                <td 
                    data-id={`${row}${i}`}
                    onClick={tdRowListener}
                    onMouseDown={onMouseDown}
                    key={`${row}${i}`}
                    style={{width: trWidth, height: trHeight}}
                />
            );
        }
        return <>{res}</>;
    }

    const RowNodes: FunctionComponent = () => {
        const res = [];
        for (let i=0; i< rows; i++) {
            res.push(<tr key={i}>{<ColNodes row={i}/>}</tr>);
        }
        return <>{res}</>;
    };

    console.log(rows, cols);
    return (
        <table className={classes.table}>
            <tbody>
               <RowNodes /> 
            </tbody>
        </table>
    );
};

export default Nodes;
