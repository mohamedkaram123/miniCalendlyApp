import { ActionTypes } from "../constans/action-type"

export const setDataLevel1 = (dataLevel1) => {
    return {
        type: ActionTypes.SET_DATA_LEVEL1,
        payload: dataLevel1
    }
}