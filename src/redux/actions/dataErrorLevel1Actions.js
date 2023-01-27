import { ActionTypes } from "../constans/action-type"

export const dataErrorLevel1Actions = (dataLevel1) => {
    return {
        type: ActionTypes.SET_ERROR_DATA_LEVEL1,
        payload: dataLevel1
    }
}