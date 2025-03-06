import { ActionTypes } from "../constants/action-types";

const authUser = (user) => {
    return {
        type: ActionTypes.LOGIN,
        payload: user
    }
}
const logoutUser = () => {
    return {
        type: ActionTypes.LOGOUT,
        payload: null
    }
}

export { authUser, logoutUser }