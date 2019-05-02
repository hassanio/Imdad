import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOGIN_LOADING, LOADING_DONATIONS, FETCH_DONATIONS_SUCC, FETCH_DONATIONS_FAIL} from './types'
import { ToastAndroid, AsyncStorage } from "react-native"
const axios = require('axios')

export const login = (values, isDonor, nav) => 
    async (dispatch) => {
        try {

            dispatch({ type: LOGIN_LOADING })
            const route = isDonor ? 'auth/donor/signin' : 'auth/ngo/signin'

            //Submit login credentials to server
            const res = await axios.post('https://young-castle-56897.herokuapp.com/' + route, values)

            await Promise.all([
                AsyncStorage.setItem('token', res.data.token),
                AsyncStorage.setItem('isDonor', JSON.stringify(res.data.isDonor))
            ])

            //Tell redux that login is successful
            dispatch(LoginSuccess({ token: res.data.token, isDonor: res.data.isDonor}))

            ToastAndroid.show("Login Successful", ToastAndroid.LONG)

            nav.navigate('Main')

        }
        catch(err) {

            if (err.response) {
                dispatch(LoginError("Unauthorized. Provide valid credentials."))
                ToastAndroid.show("Unauthorized. Provide valid credentials.", ToastAndroid.LONG)
            }
            else if (err.request) {
                dispatch(LoginError("Unable to process! Please check your internet connection!"))
                ToastAndroid.show("Unable to process! Please check your internet connection!", ToastAndroid.LONG)
            }
            else {
                dispatch(LoginError("Unexpected Error Occurred. Try again later"))
                ToastAndroid.show("Unexpected Error Occurred. Try again later", ToastAndroid.LONG)
            }

        }
    }

export const LoginSuccess = data => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export const LoginError = error => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

export const Logout = (nav) => 
    async (dispatch) => {
        await AsyncStorage.removeItem('token')
        dispatch({ type: LOGOUT })
        nav.navigate('Auth')
    }

export const FetchDonations = (token) => 
    async (dispatch) => {
        try {
            dispatch({ type: LOADING_DONATIONS })
            const res = await axios.get('https://young-castle-56897.herokuapp.com/fetchDonations', {headers: {authorization: token}})
            dispatch({type: FETCH_DONATIONS_SUCC, payload: res.data})
        }
        catch(err) {
			if (err.response) {
				if (err.response.status === 422) {
					ToastAndroid.show(err.response.data.error, ToastAndroid.LONG)
	
				} else {
					ToastAndroid.show("Failed to Fetch Donations", ToastAndroid.LONG)
				}
			}
            else if (err.request) {
            	ToastAndroid.show("Unable to process! Please check your internet connection!", ToastAndroid.LONG)

            } else {
				ToastAndroid.show("Unexpected Error Occurred. Try again later", ToastAndroid.LONG)
			}
        }
    }
