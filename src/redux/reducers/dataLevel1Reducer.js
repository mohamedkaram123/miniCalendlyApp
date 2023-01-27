import { ActionTypes } from "../constans/action-type";

const initialState = {
    data: [],

}

export const dataLevel1Reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_DATA_LEVEL1:

            return {data:payload };
    case ActionTypes.SET_ERROR_DATA_LEVEL1:

        return {err:payload };
    case ActionTypes.SET_DATA_SUCCESS_LEVEL1:

        return {res:payload };
        default:
            return state;
    }

}