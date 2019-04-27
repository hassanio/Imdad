import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import DonationsReducer from './DonationsReducer'

export default combineReducers({
	form: reduxForm,
	auth: authReducer,
	all_donations: DonationsReducer
})