'use strict';

/**
 * Nav
 * 
 * @description
 * List main navigation items
 *
 * @module 'components/modules/nav'
 * @author ljd
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { closeDrawer } from '../../../actions/drawer';
import { logout } from '../../../actions/login';

class NavModule extends React . Component {

	onLinkClick() {
		const { dispatch } = this.props;

		dispatch(closeDrawer());
	}

	onLogoutClick() {
		const { dispatch } = this.props;

		dispatch(logout());
	}

	render() {
		const { session } = this.props;

		var firstName = session && session.name.split(' ')[0];

		return (
			<nav className="c-nav">
				<ul className="c-nav__list o-block-list">
					<li className="c-nav__item">
						<Link to="list" className="c-nav__link" activeClassName="c-nav__link--active" onClick={() => this.onLinkClick()}>All your vehicles</Link>
					</li>
				</ul>
					<a className="o-btn" onClick={() => this.onLogoutClick()}>Logout { firstName }</a>
			</nav>
			);
	}

}



NavModule.propTypes = {
	dispatch: React.PropTypes.func.isRequired,
	session: React.PropTypes.object
};



function mapStateToProps(state) {
	return {
		session: state.login && state.login.session
	};
}




export default connect(mapStateToProps)(NavModule);