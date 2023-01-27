import { ActionTypes } from "../constans/action-type";

const initialState = {
    data: [],

}

export const dataLevel2Reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_DATA_LEVEL2:

        return {res:payload };
        default:
            return state;
    }

}