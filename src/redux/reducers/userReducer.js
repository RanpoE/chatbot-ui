import { ActionTypes } from "../constants/action-types";

// Take initial state and action
const initialState = {}


export const userReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.LOGIN:
            console.log("HELLO", payload)
            return payload
        case ActionTypes.LOGOUT:
            return payload
        default:
            return state
    }
}