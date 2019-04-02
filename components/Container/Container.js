import React from 'react'
import propTypes from 'prop-types'
import { View } from 'react-native'
import styles from './styles'

const Container = ({children}) => (
	<View style = {styles.container}>
		{children}
	</View>
)

Container.propTypes = {
	children: propTypes.element,
}

export default Container