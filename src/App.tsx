import React, { ReactElement } from "react";
import Header from "./components/header";
import Graph from "./components/graph";
import Info from "./components/Info";
import { useStyles } from "./AppStyles";

function App(): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <Info />
            <Graph />
        </div>
    );
}

export default App;
