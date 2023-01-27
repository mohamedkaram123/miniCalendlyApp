import { ActionTypes } from "../constans/action-type"

export const setDataLevel2 = (dataLevel2) => {
    return {
        type: ActionTypes.SET_DATA_LEVEL2,
        payload: dataLevel2
    }
}