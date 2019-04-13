import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from './types'
import { AsyncStorage } from "react-native"
const axios = require('axios')

export const loginDonor = (values) => 
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

        }
        catch(err) {

            if (err.response) {
                dispatch(LoginError("Unauthorized. Provide valid credentials."))
            }
            else if (err.request) {
                dispatch(LoginError("No network connection!"))
            }

        }
    }

export const LoginError = error => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

