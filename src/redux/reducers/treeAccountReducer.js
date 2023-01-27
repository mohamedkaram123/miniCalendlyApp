import { ActionTypes } from "../constans/action-type";

const initialState = {
    trees: [],

}

export const treeAccountReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_TREES:

            return {...state,trees:payload };
        default:
            return state;
    }

}