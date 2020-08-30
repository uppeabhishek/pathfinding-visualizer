import React, { ReactElement, useState } from "react";
import Header from "./components/header";
import Graph from "./components/graph";
import Info from "./components/Info";
import { useStyles } from "./AppStyles";
import Tutorial from "./components/Tutorial";
import Information from "./components/Information";

function App(): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <div className={classes.main}>
                <Tutorial />
                <Information />
                <Info />
                <Graph />
            </div>
        </div>
    );
}

export default App;
