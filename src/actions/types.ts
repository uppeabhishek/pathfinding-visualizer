export const CHANGE_ALGORITHM = "CHANGE_ALGORITHM";
export const CHANGE_MAZE_TYPE = "CHANGE_MAZE_TYPE";
export const CHANGE_ANIMATION_SPEED = "CHANGE_ANIMATION_SPEED";
export const VISUALIZE_ALGORITHM = "VISUALIZE_ALGORITHM";

export type AlgorithmType = string;
export type MazeType = string;
export type AnimationSpeed = number;
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

export interface VisualizeAlgorithm {
    type: typeof VISUALIZE_ALGORITHM;
    vAlgorithm: VAlgorithm;
}

export type GlobalTypes =
    | ChangeAlgorithm
    | ChangeMazeType
    | ChangeAnimationSpeed
    | VisualizeAlgorithm;

export interface GlobalState {
    algorithm: AlgorithmType;
    mazeType: MazeType;
    animationSpeed: AnimationSpeed;
    vAlgorithm: VAlgorithm;
}
