import { combineReducers } from "redux";

import globals from "./globals";

export const rootReducer = combineReducers({
    globals
});

export type RootState = ReturnType<typeof rootReducer>;
