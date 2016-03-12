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

class NavModule extends React.Component {

	onLinkClick () {
		const { dispatch } = this.props;

		dispatch(closeDrawer());
	}
	
	render () {
		return (
			<nav className="c-nav">
				<ul className="c-nav__list o-block-list">
					<li className="c-nav__item">
						<Link to="list" className="c-nav__link" activeClassName="c-nav__link--active" onClick={() => this.onLinkClick()}>All my vehicles</Link>
					</li>
					<li className="c-nav__item">
						<a className="c-nav__link" activeClassName="c-nav__link--active" onClick={() => this.onLinkClick()}>Logout</a>
					</li>
				</ul>
			</nav>
		);
	}

}



NavModule.propTypes = {
	dispatch: React.PropTypes.func.isRequired
};



export default connect()(NavModule);