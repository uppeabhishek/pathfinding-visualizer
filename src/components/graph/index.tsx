import React, { FunctionComponent } from "react";
import { useStyles } from "./styles";

const Graph: FunctionComponent = () => {
    const classes = useStyles();

    return <div className={classes.root}>Hello</div>;
};

export default Graph;
