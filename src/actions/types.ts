export const CHANGE_ALGORITHM = "CHANGE_ALGORITHM";
export const CHANGE_MAZE_TYPE = "CHANGE_MAZE_TYPE";
export const CHANGE_ANIMATION_SPEED = "CHANGE_ANIMATION_SPEED";
export const CLEAR_ROUTE = "CLEAR_ROUTE";
export const CLEAR_WEIGHTS = "CLEAR_WEIGHTS";
export const CLEAR_BOARD = "CLEAR_BOARD";
export const VISUALIZE_ALGORITHM = "VISUALIZE_ALGORITHM";

export type AlgorithmType = string;
export type MazeType = string;
export type AnimationSpeed = number;
export type Route = boolean;
export type Weights = boolean;
export type Board = boolean;
export type VAlgorithm = boolean;

export interface ChangeAlgorithm {
    type: typeof CHANGE_ALGORITHM;
    algorithm: AlgorithmType;
}

export interface ChangeMazeType {
    type: typeof CHANGE_MAZE_TYPE;
    mazeType: MazeType;
}

export interface ChangeAnimationSpeed {
    type: typeof CHANGE_ANIMATION_SPEED;
    animationSpeed: AnimationSpeed;
}

export interface ClearRoute {
    type: typeof CLEAR_ROUTE;
    clearRoute: Route;
}

export interface ClearWeights {
    type: typeof CLEAR_WEIGHTS;
    clearWeights: Weights;
}

export interface ClearBoard {
    type: typeof CLEAR_BOARD;
    clearBoard: Board;
}

export interface VisualizeAlgorithm {
    type: typeof VISUALIZE_ALGORITHM;
    vAlgorithm: VAlgorithm;
}

export type GlobalTypes =
    | ChangeAlgorithm
    | ChangeMazeType
    | ChangeAnimationSpeed
    | ClearRoute
    | ClearWeights
    | ClearBoard
    | VisualizeAlgorithm;

export interface GlobalState {
    algorithm: AlgorithmType;
    mazeType: MazeType;
    animationSpeed: AnimationSpeed;
    clearWeights: Weights;
    clearBoard: Board;
    clearRoute: Route;
    vAlgorithm: VAlgorithm;
}
