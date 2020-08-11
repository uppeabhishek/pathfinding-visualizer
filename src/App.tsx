import React, { ReactElement, useState } from "react";
import Header from "./components/header";
import Graph from "./components/graph";
import Info from "./components/Info";
import { useStyles } from "./AppStyles";
import Tutorial from "./components/Tutorial";

function App(): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <div className={classes.main}>
                <Tutorial />
                <Info />
                <Graph />
            </div>
        </div>
    );
}

export default App;
