import React from 'react'
// import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// 路由拦截未登录跳转登录页
class AuthorizedRoute extends React.Component {
	render() {
		const { component: Component, ...rest } = this.props
		const isLogged = true
		return (
			<Route {...rest} render={props => {
				return isLogged
					? <Component {...props} />
					: <Redirect to="/login" />
			}} />
		)
	}
}

export default AuthorizedRoute

// const stateToProps = (state) => {
// 	return {
// 	  sysSignIn: state.system.sysSignIn,
// 	}
// }

// export default connect(stateToProps)(AuthorizedRoute)
