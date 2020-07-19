import React, { FunctionComponent, useRef, useEffect } from "react";
import { useStyles } from "./styles";

const Nodes: FunctionComponent<{height: number , width: number}> = ({height, width}) => {
    const classes = useStyles();

    const rows = Math.round(height/25), cols = Math.round(width/25);

    const Node = ()
    console.log(rows, cols);
    return (
        <table>
            <tbody>
                
            </tbody>
        </table>
    );
};

export default Nodes;
