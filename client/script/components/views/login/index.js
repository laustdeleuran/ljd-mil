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
import { connect } from 'react-redux';

import LoginModule from '../../modules/login';

class LoginView extends React.Component {
	render () {
		const { redirect } = this.props;
		
		return (
			<div className="o-view o-view--login">
				<LoginModule redirect={ redirect } />
			</div>
		);
	}
}



LoginView.propTypes = {
	redirect: React.PropTypes.string
};



function mapStateToProps(state, ownProps) {
	return {
		redirect: ownProps.location.query.redirect
	};
}



export default connect(mapStateToProps)(LoginView);