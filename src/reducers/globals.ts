import {
    CHANGE_ALGORITHM,
    CHANGE_MAZE_TYPE,
    CHANGE_ANIMATION_SPEED,
    CLEAR_ROUTE,
    CLEAR_BOARD,
    CLEAR_WEIGHTS,
    VISUALIZE_ALGORITHM,
    GlobalTypes,
    GlobalState
} from "../actions/types";

const initialState: GlobalState = {
    algorithm: "",
    animationSpeed: 50,
    mazeType: "",
    clearRoute: false,
    clearBoard: false,
    clearWeights: false,
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
        case CLEAR_ROUTE: {
            return {
                ...state,
                clearRoute: action.clearRoute
            };
        }
        case CLEAR_BOARD: {
            return {
                ...state,
                clearBoard: action.clearBoard
            };
        }
        case CLEAR_WEIGHTS: {
            return {
                ...state,
                clearWeights: action.clearWeights
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
