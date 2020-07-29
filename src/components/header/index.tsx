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
import { changeAlgorithm, changeMazeType, toggleVisualizeAlgorithm } from "../../actions";
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

    const toggleMazeGenerationAlgorithmFunc = (event: ChangeEvent<{ value: unknown }>) => {
        dispatch(changeMazeType(event.target.value as string));
    };

    const graphAlgorithms = useRef([
        {
            name: "Breath First Search",
            value: "BFS"
        },
        {
            name: "Dijkstra's",
            value: "Dijkstra's"
        },
        {
            name: "A*",
            value: "AStar"
        }
    ]);

    const mazeGenerationAlgorithms = useRef([
        {
            name: "Recursive Division",
            value: "recursiveDivision"
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
                            <Typography variant="h6">Mazes</Typography>
                        </InputLabel>
                        <Select
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
                        variant="contained"
                        // @ts-ignore
                        onClick={() => dispatch(toggleVisualizeAlgorithm(new Boolean(true)))}
                    >
                        Visualize
                    </Button>

                    <div>
                        <Typography gutterBottom={true} id="animationSpeedSlider">
                            Animation Speed
                        </Typography>
                        <Slider
                            aria-labelledby="animationSpeedSliderr"
                            defaultValue={animationSpeed}
                            getAriaValueText={getAnimationSpeed}
                            marks={true}
                            max={100}
                            min={10}
                            step={10}
                            valueLabelDisplay="auto"
                        />
                    </div>

                    <Button color="secondary" variant="contained" onClick={clearRoute}>
                        Clear Route
                    </Button>

                    <Button color="secondary" variant="contained" onClick={clearWalls}>
                        Clear Walls
                    </Button>

                    <Button color="secondary" variant="contained" onClick={clearWeights}>
                        Clear Weights
                    </Button>

                    <Button color="secondary" variant="contained" onClick={clearBoard}>
                        Clear Board
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
