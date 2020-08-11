import React, { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import algorithmDropDown from "../../assets/AlgorithmDropDown.png";
import mazeDropDown from "../../assets/MazeDropDown.png";
import Download from "../../assets/Download.png";

const Info: FunctionComponent<{ activeStep: number }> = ({ activeStep }) => {
    const pages = {
        0: (
            <div>
                <Typography variant="h6">
                    This tutorial will walk through the features of Pathfinding Visualizer
                </Typography>
                <br />
                <Typography>
                    If you want to dive into the application directly. Feel free to Skip this
                    tutorial by closing it.
                </Typography>
            </div>
        ),
        1: (
            <div>
                <Typography variant="h6">What is Pathfinding algorithm?</Typography>
                <br />
                <Typography>
                    Pathfinding algorithm aims at finding the shortest path between two nodes in a
                    Graph.
                </Typography>
                <br />
                <Typography variant="h6">
                    Path finding algorithms are generally classfied into two types
                </Typography>
                <div>
                    <ul>
                        <li>
                            <b>Weighted:</b> Each node in the graph may have different weight. (Cost
                            of travelling one node may be higher than other)
                        </li>
                        <li>
                            <b>Unweighted:</b> Each node has same weight. (Cost of travelling each
                            node is similar)
                        </li>
                    </ul>
                </div>
                <br />
            </div>
        ),
        2: (
            <div>
                <Typography variant="h6">Choose Algorithm</Typography>
                <br />
                <div>
                    There are many algorithms to find the shortest path. But I have implemented most
                    used algorithms in path finding as below.
                </div>
                <ul>
                    <li>A* (Weighted)</li>
                    <li>Dijkstra's (Weighted)</li>
                    <li>Breath First Search (Unweighted)</li>
                </ul>

                <div>
                    To choose an algorithm, pick an algorithm from "Algorithms" drop down menu.
                </div>
                <div className="center-items" style={{ marginTop: 10 }}>
                    <img src={algorithmDropDown} />
                </div>
            </div>
        ),
        3: (
            <div>
                <Typography variant="h6">Choose Maze or Pattern</Typography>
                <br />
                <div>I have implemented the following mazes and patterns</div>
                <ul>
                    <li>Random Maze</li>
                    <li>Random Weight</li>
                </ul>

                <div>
                    To choose a maze or pattern, pick a maze or pattern from "Mazes and Patterns"
                    drop down menu.
                </div>
                <div className="center-items" style={{ marginTop: 10 }}>
                    <img src={mazeDropDown} />
                </div>
            </div>
        ),
        4: (
            <div>
                <Typography variant="h6">Adding Walls and Weights</Typography>
                <br />
                <div>Click on the grid to toggle a wall.</div>
                <div>Click on grid and hold 'w' to add weight.</div>
                <br />
                <div>Nodes can't pass through walls.</div>

                <div>
                    Adding weights increase the travel cost in the route. Here each weight has cost
                    of 10.
                </div>
            </div>
        ),
        5: (
            <div>
                <Typography variant="h6">Visualize</Typography>
                <br />
                <div>Click on "Visualize" Button to visualize the algorithm.</div>
                <div className="center-items" style={{ marginTop: 10 }}>
                    <img src={Download} />
                </div>
            </div>
        ),
        6: (
            <div>
                <Typography variant="h6">Other features</Typography>
                <ul>
                    <li>
                        <b>Animation: </b> Change the animation speed.
                    </li>
                    <li>
                        <b>Clear Route: </b> Clear the shortest Route.
                    </li>
                    <li>
                        <b>Clear Walls: </b> Clears the walls.
                    </li>
                    <li>
                        <b>Clear Weights: </b> Clears the weights.
                    </li>
                    <li>
                        <b>Clear Board: </b> Clear the entire board.
                    </li>
                </ul>
                <Typography variant="h6">Enjoy the visualization tool</Typography>
            </div>
        )
    };

    // @ts-ignore
    return pages[activeStep];
};

export default Info;
