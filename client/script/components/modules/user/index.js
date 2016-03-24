'use strict';

/**
 * User
 * 
 * @description
 * User login area
 *
 * @module 'components/modules/user'
 * @author ljd
 */

import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../../actions/login';

class UserModule extends React.Component {

	onLogoutClick (event) {
		if (event) {
			event.preventDefault();
		}

		this.doLogout();
	}

	doLogout () {
		const { dispatch } = this.props;

		dispatch(logout());
	}
	
	render () {
		const { session } = this.props;

		var firstName = session && session.name.split(' ')[0];

		return (
			<form className="c-user">
				<button onClick={(event) => this.onLogoutClick(event) } className="c-user__btn o-btn o-btn--small">Logout { firstName }</button>
			</form>
		);
	}

}


UserModule.propTypes = {
	dispatch: React.PropTypes.func.isRequired,
	session: React.PropTypes.object
};



function mapStateToProps(state) {
	return {
		session: state.login && state.login.session
	};
}



export default connect(mapStateToProps)(UserModule);