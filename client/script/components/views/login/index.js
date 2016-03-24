'use strict';

/**
 * Login view
 * 
 * @description
 * One simple button
 *
 * @module 'components/views/login'
 * @author ljd
 */

import React from 'react';

import LoginModule from '../../modules/login';

class LoginView extends React.Component {
	render () {
		return (
			<div className="o-view o-view--login">
				<LoginModule />
			</div>
		);
	}
}

export default LoginView;