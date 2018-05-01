import { combineReducers } from "redux";

import itemsReducer from "./../reducers/itemsReducer";

const rootReducer = combineReducers({
    items: itemsReducer
});

export default rootReducer;