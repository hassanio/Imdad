import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actions/types";

export default function(state = {}, action) {

    switch(action.type) {
        case LOGIN_SUCCESS:
            console.log(action.payload)
            return {...state, isAuth: true, error: null, token: action.payload}
        case LOGOUT:
            return {...state, isAuth: false, error: null, token: null}
        case LOGIN_FAILURE:
            return {...state, error: action.payload }
        default:
            return state
    }
}