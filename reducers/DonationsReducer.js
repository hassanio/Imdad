import { FETCH_DONATIONS_SUCC, LOADING_DONATIONS, FETCH_DONATIONS_FAIL,
         FETCHING_DONATION, FETCH_DONATION_SUCC, FETCH_DONATION_FAIL,
         LOGOUT } from "../actions/types";
import { Logout } from "../actions";

const list_to_obj = (arr) => {
    temp = {}
    arr.forEach(({_id, ...rest}) => {
        temp[_id] = {...rest, id: _id }
    })

    return temp
}

export default function(state = {loading: true, isFetching: true, donations: []}, action) {

    switch(action.type) {
        case LOADING_DONATIONS:
            return {...state, loading: true}
        case FETCH_DONATIONS_SUCC:
            return {...state, donations: list_to_obj(action.payload), loading: false}
        case FETCH_DONATIONS_FAIL:
            return {...state, loading: false}
        case FETCHING_DONATION:
            return {...state, isFetching: true }
        case FETCH_DONATION_FAIL:
            return {...state, isFetching: false}
        case FETCH_DONATION_SUCC:
            const key = action.payload._id
            return {...state, isFetching: false, donations: {
                ...state.donations,
                [key]: {...action.payload, id: action.payload._id}
            }}
        case LOGOUT: {
            return {loading: true, isFetching: true}
        }
        default:
            return state
    }
}
