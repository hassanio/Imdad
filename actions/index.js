import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOGIN_LOADING, LOADING_DONATIONS, FETCH_DONATIONS_SUCC, FETCH_DONATIONS_FAIL} from './types'
import { ToastAndroid, AsyncStorage } from "react-native"
const axios = require('axios')

export const loginDonor = (values, nav) => 
    async (dispatch) => {
        try {

            dispatch({ type: LOGIN_LOADING })

            //Submit login credentials to server
            const res = await axios.post('https://young-castle-56897.herokuapp.com/auth/donor/signin', values)

            await AsyncStorage.setItem('token', res.data.token);

            //Tell redux that login is successful
            dispatch(LoginSuccess(res.data.token))

            ToastAndroid.show("Login Successful", ToastAndroid.LONG)

            nav.navigate('Main')

        }
        catch(err) {

            if (err.response) {
                dispatch(LoginError("Unauthorized. Provide valid credentials."))
                ToastAndroid.show("Unauthorized. Provide valid credentials.", ToastAndroid.LONG)
            }
            else if (err.request) {
                dispatch(LoginError("No network connection!"))
                ToastAndroid.show("No network connection!", ToastAndroid.LONG)
            }

        }
    }

export const LoginSuccess = token => {
    return {
        type: LOGIN_SUCCESS,
        payload: token
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

            //Submit login credentials to server
            const res = await axios.get('https://young-castle-56897.herokuapp.com/fetchDonations', {headers: {authorization: token}})

            //Store token in AsyncStorage
            // console.log(JSON.stringify(res))

            //Tell redux that login is successful
            dispatch({type: FETCH_DONATIONS_SUCC, payload: res.data})

        }
        catch(err) {

            if (err.response) {
                ToastAndroid.show("FAILED TO FETCH DONATIONS", ToastAndroid.LONG)
            }
            else if (err.request) {
                ToastAndroid.show("No network connection!", ToastAndroid.LONG)
            }

        }
    }
