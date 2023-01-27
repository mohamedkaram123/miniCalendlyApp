import { ActionTypes } from "../constans/action-type"

export const setTreeAction = (treeActions) => {
    return {
        type: ActionTypes.SET_TREES,
        payload: treeActions
    }
}