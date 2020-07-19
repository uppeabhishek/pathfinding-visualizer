import React, { FunctionComponent, useState, ChangeEvent, useRef } from "react";
import {
    Slider,
    AppBar,
    Toolbar,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    Button
} from "@material-ui/core";
import { useStyles } from "./styles";

const Header: FunctionComponent = () => {
    const [graphAlgorithm, toggleGraphAlgorithm] = useState("");

    const toggleGraphAlgorithmFunc = (event: ChangeEvent<{ value: unknown }>) => {
        toggleGraphAlgorithm(event.target.value as string);
    };

    const [mazeGenerationAlgorithm, toggleMazeGenerationAlgorithm] = useState("");

    const toggleMazeGenerationAlgorithmFunc = (event: ChangeEvent<{ value: unknown }>) => {
        toggleMazeGenerationAlgorithm(event.target.value as string);
    };

    const graphAlgorithms = useRef([
        {
            name: "Depth First Search",
            value: "DFS"
        },
        {
            name: "A*",
            value: "A*"
        }
    ]);

    const mazeGenerationAlgorithms = useRef([
        {
            name: "Random",
            value: "random"
        },
        {
            name: "Recursive Backtracker",
            value: "recursiveBackTracker"
        }
    ]);

    function getAnimationSpeed(value: number) {
        return value.toString();
    }

    const classes = useStyles();

    return (
        <div>
            <AppBar className={classes.header} position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography className="item title" variant="h4">
                        Pathfinding Visualizer
                    </Typography>

                    <div className="item graphAlgorithms">
                        <InputLabel id="graphAlgorithmsLabel">
                            <Typography variant="h6">Algorithms</Typography>
                        </InputLabel>
                        <Select
                            id="graphAlgorithms"
                            labelId="graphAlgorithmsLabel"
                            value={graphAlgorithm}
                            onChange={toggleGraphAlgorithmFunc}
                        >
                            {graphAlgorithms.current.map((algo) => (
                                <MenuItem key={algo.name} value={algo.value}>
                                    {algo.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className="item mazeGenerationAlgorithms">
                        <InputLabel id="mazeGenerationAlgorithmsLabel">
                            <Typography variant="h6">Mazes</Typography>
                        </InputLabel>
                        <Select
                            id="mazeGenerationAlgorithms"
                            labelId="mazeGenerationAlgorithmsLabel"
                            value={mazeGenerationAlgorithm}
                            onChange={toggleMazeGenerationAlgorithmFunc}
                        >
                            {mazeGenerationAlgorithms.current.map((algo) => (
                                <MenuItem key={algo.name} value={algo.value}>
                                    {algo.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <Button variant="contained">Visualize</Button>

                    <div>
                        <Typography gutterBottom={true} id="animationSpeedSlider">
                            Animation Speed
                        </Typography>
                        <Slider
                            aria-labelledby="animationSpeedSliderr"
                            defaultValue={30}
                            getAriaValueText={getAnimationSpeed}
                            marks={true}
                            max={100}
                            min={10}
                            step={10}
                            valueLabelDisplay="auto"
                        />
                    </div>

                    <Button color="secondary" variant="contained">
                        Clear Route
                    </Button>

                    <Button color="secondary" variant="contained">
                        Clear Weights
                    </Button>

                    <Button color="secondary" variant="contained">
                        Clear Board
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
