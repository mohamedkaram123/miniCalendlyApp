import { ActionTypes } from "../constans/action-type"

export const dataSuccessLevel1Actions = (dataLevel1) => {
    return {
        type: ActionTypes.SET_DATA_SUCCESS_LEVEL1,
        payload: dataLevel1
    }
}