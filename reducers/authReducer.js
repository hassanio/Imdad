import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, LOGIN_LOADING } from "../actions/types";

export default function(state = {}, action) {

    switch(action.type) {
        case LOGIN_LOADING:
            return {...state, loading: true}
        case LOGIN_SUCCESS:
            return {...state, isAuth: true, error: null, token: action.payload.token, isDonor: action.payload.isDonor, loading: false}
        case LOGOUT:
            return {...state, isAuth: false, error: null, token: null}
        case LOGIN_FAILURE:
            return {...state, error: action.payload, loading: false }
        default:
            return state
    }
}