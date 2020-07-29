import {
    CHANGE_ALGORITHM,
    CHANGE_MAZE_TYPE,
    CHANGE_ANIMATION_SPEED,
    VISUALIZE_ALGORITHM,
    GlobalTypes,
    GlobalState
} from "../actions/types";

const initialState: GlobalState = {
    algorithm: "",
    animationSpeed: 1,
    mazeType: "",
    vAlgorithm: false
};

const globals = (state = initialState, action: GlobalTypes): GlobalState => {
    switch (action.type) {
        case CHANGE_ALGORITHM: {
            return {
                ...state,
                algorithm: action.algorithm
            };
        }
        case CHANGE_MAZE_TYPE: {
            return {
                ...state,
                mazeType: action.mazeType
            };
        }
        case CHANGE_ANIMATION_SPEED: {
            return {
                ...state,
                animationSpeed: action.animationSpeed
            };
        }
        case VISUALIZE_ALGORITHM: {
            return {
                ...state,
                vAlgorithm: action.vAlgorithm
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};

export default globals;
