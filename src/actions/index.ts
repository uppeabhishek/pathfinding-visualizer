import {
    AlgorithmType,
    GlobalTypes,
    CHANGE_ALGORITHM,
    MazeType,
    CHANGE_MAZE_TYPE,
    AnimationSpeed,
    CHANGE_ANIMATION_SPEED,
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

export const toggleVisualizeAlgorithm = (vAlgorithm: VAlgorithm): GlobalTypes => ({
    vAlgorithm,
    type: VISUALIZE_ALGORITHM
});
