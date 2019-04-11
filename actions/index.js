import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types'
const axios = require('axios')

export const loginDonor = (values) => 
    async (dispatch) => {
        try {

            //Submit login credentials to server
            const res = await axios.post('http://10.130.35.102:3000/auth/donor/signin', values)

            //Store token in AsyncStorage
            console.log(JSON.stringify(res))

            //Tell redux that login is successful
            dispatch({ type: LOGIN_SUCCESS })
        }
        catch {
            dispatch(LoginError("Unauthorized. Provide valid credentials."))
        }
    }

export const LoginError = error => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}