import { combineReducers } from "redux";
import { dataLevel1Reducer } from "./dataLevel1Reducer";
import { langsReducer } from "./langsReducer";

const reducers = combineReducers({
    allTanslations: langsReducer,
    dataLevel1: dataLevel1Reducer,

})


export default reducers;
