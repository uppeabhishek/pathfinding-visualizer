import React, { FunctionComponent } from "react";
import weight from "../../assets/weight.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { trWidth, trHeight } from "../../commonUtilities";

const Information: FunctionComponent = () => {
    const Box = (props: { color: string }) => {
        if (props.color === "white") {
            return (
                <div
                    style={{
                        width: `${trWidth}px`,
                        height: `${trHeight}px`,
                        marginRight: "10px",
                        border: "2px solid blue"
                    }}
                />
            );
        }
        return (
            <div
                style={{
                    width: `${trWidth}px`,
                    height: `${trHeight}px`,
                    marginRight: "10px",
                    backgroundColor: props.color
                }}
            />
        );
    };

    const getText = (algorithm: string) => {
        let data = <div>Please Select an algorithm.</div>;

        if (algorithm === "BFS") {
            data = (
                <div>
                    <div>
                        <i>BFS is an unweighted algorithm and guarantees the shorest path.</i>
                    </div>
                    <div className="d-flex mt-10">
                        <div className="mr-10">
                            Time Complexity : <b>O(V + E)</b>
                        </div>
                        <div className="ml-10">
                            Space Complexity : <b>O(V)</b>
                        </div>
                    </div>
                </div>
            );
        } else if (algorithm === "Dijkstra's") {
            data = (
                <div>
                    <div>
                        <i>Dijkstra's is an weighted algorithm and guarantees the shorest path.</i>
                    </div>
                    <div className="d-flex mt-10">
                        <div className="mr-10">
                            Time Complexity : <b>O(ELogV)</b>
                        </div>
                        <div className="ml-10">
                            Space Complexity : <b>O(V)</b>
                        </div>
                    </div>
                </div>
            );
        } else if (algorithm === "AStar") {
            data = (
                <div>
                    <div>
                        <i>
                            A* is an weighted algorithm and guarantees the shorest path. (Best
                            Shortest Path Algorithm)
                        </i>
                    </div>
                    <div className="d-flex mt-10">
                        <div className="mr-10">
                            Time Complexity : <b>O(E)</b>
                        </div>
                        <div className="ml-10">
                            Space Complexity : <b>O(V)</b>
                        </div>
                    </div>
                </div>
            );
        }

        return data;
    };

    const algorithm = useSelector((state: RootState) => state.globals.algorithm);

    return (
        <div style={{ minHeight: "122px" }}>
            <div className="center-items" style={{ padding: "10px 0" }}>
                <div className="d-flex information-item">
                    <Box color="green" />
                    <div className="center-items">Source Node</div>
                </div>
                <div className="d-flex information-item">
                    <Box color="red" />
                    <div className="center-items">Destination Node</div>
                </div>

                <div className="d-flex information-item">
                    <Box color="grey" />
                    <div className="center-items">Wall Node</div>
                </div>

                <div className="d-flex information-item">
                    <img src={weight} alt="weight node" width="30" height="30" />
                    <div className="center-items">Weight Node</div>
                </div>

                <div className="d-flex information-item">
                    <Box color="white" />
                    <div className="center-items">Unvisited Node</div>
                </div>

                <div className="d-flex information-item">
                    <Box color="#61dafb" />
                    <div className="center-items">Visited Node</div>
                </div>

                <div className="d-flex information-item">
                    <Box color="lightgreen" />
                    <div className="center-items">Shortest Path Node</div>
                </div>
            </div>
            <div className="center-items mt-10 mb-10">{getText(algorithm)}</div>
        </div>
    );
};

export default Information;
