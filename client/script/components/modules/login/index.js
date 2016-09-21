'use strict';

/**
 * Login
 * 
 * @description
 * Login button - tadaaa
 *
 * @module 'components/modules/login'
 * @author ljd
 */

import '../../../../style/objects/_btn.scss';
import '../../../../style/components/_login.scss';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { fetchLoginIfNeeded } from '../../../actions/login';

class LoginModule extends React.Component {

	componentWillUpdate(nextProps) {
		const { dispatch, session, redirect } = nextProps;

		if (session) {
			dispatch(push(redirect || '/'));
		}
	}

	onLoginSubmit (event) {
		if (event) {
			event.preventDefault();
		}

		this.doLogin();
	}

	doLogin () {
		const { dispatch } = this.props;

		dispatch(fetchLoginIfNeeded());
	}
	
	render () {
		return (
			<form className="c-login" onSubmit={ (event) => this.onLoginSubmit(event) }>
				<h1 className="c-login__title">Mil</h1>
				<p className="c-login__subtitle">The dead simple mileage tracker</p>
				<button className="c-login__btn o-btn">Login with FB</button>
			</form>
		);
	}

}



LoginModule.propTypes = {
	dispatch: React.PropTypes.func.isRequired,
	session: React.PropTypes.object,
	redirect: React.PropTypes.string
};



function mapStateToProps(state, ownProps) {
	return {
		session: state.login && state.login.session,
		redirect: ownProps.location.query.redirect
	};
}



export default connect(mapStateToProps)(LoginModule);