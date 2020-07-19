import React, { FunctionComponent, useRef, useEffect, useState } from "react";
import { useStyles } from "./styles";
import Nodes from "./nodes";

const Graph: FunctionComponent = () => {
    const classes = useStyles();
    const graphRef = useRef<HTMLDivElement>(null);

    const [heightWidth, setHeightWidth] = useState([0,0]);

    useEffect(() => {
        if (graphRef.current) {
            setHeightWidth([graphRef.current.clientHeight, graphRef.current.clientWidth])
        }
    }, []);
    
    return (
        <div className={classes.root} ref={graphRef}>
            {heightWidth[0]>0 && <Nodes height={heightWidth[0]} width={heightWidth[1]} />}
        </div>
    );
};

export default Graph;
