import React, { FunctionComponent, ChangeEvent, useRef } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { useStyles } from "./styles";
import {
    changeAlgorithm,
    changeMazeType,
    toggleVisualizeAlgorithm,
    changeAnimationSpeed
} from "../../actions";
import { RootState } from "../../reducers";
import { clearRoute, clearWeights, clearBoard, clearWalls } from "../../commonUtilities";

const Header: FunctionComponent = () => {
    const dispatch = useDispatch();

    const algorithm = useSelector((state: RootState) => state.globals.algorithm);

    const animationSpeed = useSelector((state: RootState) => state.globals.animationSpeed);

    const toggleGraphAlgorithmFunc = (event: ChangeEvent<{ value: unknown }>) => {
        dispatch(changeAlgorithm(event.target.value as string));
    };

    const mazeType = useSelector((state: RootState) => state.globals.mazeType);

    const vAlgorithm = useSelector((state: RootState) => state.globals.vAlgorithm);

    const toggleMazeGenerationAlgorithmFunc = (event: ChangeEvent<{ value: unknown }>) => {
        dispatch(changeMazeType(event.target.value as string));
    };

    const graphAlgorithms = useRef([
        {
            name: "A* (W)",
            value: "AStar"
        },
        {
            name: "Dijkstra's (W)",
            value: "Dijkstra's"
        },
        {
            name: "Breath First Search (UW)",
            value: "BFS"
        }
    ]);

    const mazeGenerationAlgorithms = useRef([
        {
            name: "Random Maze",
            value: "randomMaze"
        },
        {
            name: "Random Weights",
            value: "randomWeights"
        }

        /*
         * {
         *     name: "Recursive Division",
         *     value: "recursiveDivision"
         * }
         */
    ]);

    function getAnimationSpeed(value: number) {
        return value.toString();
    }

    const classes = useStyles();

    function changeAnimationSpeedFunc(event: ChangeEvent<{}>, value: number | number[]) {
        if (typeof value === "number") {
            dispatch(changeAnimationSpeed(value));
        }
    }

    return (
        <div>
            <AppBar className={classes.header} position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography
                        className="cursor-pointer"
                        variant="h4"
                        onClick={() => window.location.reload()}
                    >
                        Pathfinding Visualizer
                    </Typography>

                    <div className="graphAlgorithms">
                        <InputLabel id="graphAlgorithmsLabel">
                            <Typography variant="h6">Algorithms</Typography>
                        </InputLabel>
                        <Select
                            disabled={vAlgorithm}
                            id="graphAlgorithms"
                            labelId="graphAlgorithmsLabel"
                            value={algorithm}
                            onChange={toggleGraphAlgorithmFunc}
                        >
                            {graphAlgorithms.current.map((algo) => (
                                <MenuItem key={algo.name} value={algo.value}>
                                    {algo.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className="mazeGenerationAlgorithms">
                        <InputLabel id="mazeGenerationAlgorithmsLabel">
                            <Typography variant="h6">Mazes and Patterns</Typography>
                        </InputLabel>
                        <Select
                            disabled={vAlgorithm}
                            id="mazeGenerationAlgorithms"
                            labelId="mazeGenerationAlgorithmsLabel"
                            value={mazeType}
                            onChange={toggleMazeGenerationAlgorithmFunc}
                        >
                            {mazeGenerationAlgorithms.current.map((algo) => (
                                <MenuItem key={algo.name} value={algo.value}>
                                    {algo.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <Button
                        color="primary"
                        disabled={vAlgorithm}
                        variant="contained"
                        onClick={() => {
                            if (algorithm) {
                                dispatch(toggleVisualizeAlgorithm(true));
                            }
                        }}
                    >
                        Visualize
                    </Button>

                    <div>
                        <Typography
                            color="textPrimary"
                            gutterBottom={true}
                            id="animationSpeedSlider"
                        >
                            Animation Speed
                        </Typography>
                        <Slider
                            aria-labelledby="animationSpeedSliderr"
                            disabled={vAlgorithm}
                            getAriaValueText={getAnimationSpeed}
                            marks={true}
                            max={90}
                            min={10}
                            step={10}
                            value={animationSpeed}
                            valueLabelDisplay="off"
                            onChange={changeAnimationSpeedFunc}
                        />
                    </div>

                    <Button
                        color="secondary"
                        disabled={vAlgorithm}
                        variant="contained"
                        onClick={clearRoute}
                    >
                        Clear Route
                    </Button>

                    <Button
                        color="secondary"
                        disabled={vAlgorithm}
                        variant="contained"
                        onClick={clearWalls}
                    >
                        Clear Walls
                    </Button>

                    <Button
                        color="secondary"
                        disabled={vAlgorithm}
                        variant="contained"
                        onClick={clearWeights}
                    >
                        Clear Weights
                    </Button>

                    <Button
                        color="secondary"
                        disabled={vAlgorithm}
                        variant="contained"
                        onClick={clearBoard}
                    >
                        Clear Board
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
