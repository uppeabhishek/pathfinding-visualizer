import {
    AlgorithmType,
    GlobalTypes,
    CHANGE_ALGORITHM,
    MazeType,
    CHANGE_MAZE_TYPE,
    AnimationSpeed,
    CHANGE_ANIMATION_SPEED,
    CLEAR_ROUTE,
    Route,
    Weights,
    CLEAR_WEIGHTS,
    Board,
    CLEAR_BOARD,
    VISUALIZE_ALGORITHM,
    VAlgorithm
} from "./types";

export const changeAlgorithm = (algorithm: AlgorithmType): GlobalTypes => ({
    algorithm,
    type: CHANGE_ALGORITHM
});

export const changeMazeType = (mazeType: MazeType): GlobalTypes => ({
    mazeType,
    type: CHANGE_MAZE_TYPE
});

export const changeAnimationSpeed = (animationSpeed: AnimationSpeed): GlobalTypes => ({
    animationSpeed,
    type: CHANGE_ANIMATION_SPEED
});

export const toggleClearRoute = (clearRoute: Route): GlobalTypes => ({
    clearRoute,
    type: CLEAR_ROUTE
});

export const toggleClearWeights = (clearWeights: Weights): GlobalTypes => ({
    clearWeights,
    type: CLEAR_WEIGHTS
});

export const toggleClearBoard = (clearBoard: Board): GlobalTypes => ({
    clearBoard,
    type: CLEAR_BOARD
});

export const toggleVisualizeAlgorithm = (vAlgorithm: VAlgorithm): GlobalTypes => ({
    vAlgorithm,
    type: VISUALIZE_ALGORITHM
});
