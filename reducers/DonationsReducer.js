import { FETCH_DONATIONS_SUCC, LOADING_DONATIONS } from "../actions/types";

const list_to_obj = (arr) => {
    temp = {}
    arr.forEach(({_id, ...rest}) => {
        temp[_id] = rest
    })

    return temp
}

export default function(state = {}, action) {

    switch(action.type) {
        case LOADING_DONATIONS:
            return {...state, loading: true}
        case FETCH_DONATIONS_SUCC:
            return {donations: list_to_obj(action.payload), loading: false}
        default:
            return state
    }
}
