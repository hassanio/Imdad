import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from './types'
import { ToastAndroid, AsyncStorage } from "react-native"
const axios = require('axios')

export const loginDonor = (values, nav) => 
    async (dispatch) => {
        try {

            dispatch(LoginError("Sending request..."))

            //Submit login credentials to server
            const res = await axios.post('https://young-castle-56897.herokuapp.com/auth/donor/signin', values)

            //Store token in AsyncStorage
            console.log(JSON.stringify(res))

            await AsyncStorage.setItem('token', res.data.token);

            //Tell redux that login is successful
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.token })

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

export const LoginError = error => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

