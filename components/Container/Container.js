import React from 'react'
import propTypes from 'prop-types'
import { View } from 'react-native'
import container_styles from './styles'

const Container = ({children}) => (
	<View style = {container_styles.container}>
		{children}
	</View>
)

Container.propTypes = {
	children: propTypes.element,
}

export default Container