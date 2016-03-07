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
import { closeDrawer } from '../../../actions';

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
	dispatch: React.PropTypes.func.isRequired,
	location: React.PropTypes.object.isRequired
};



function select(state) {
	return {
		location: state.routing.location // We need to explicitly define what state props we depend on, even though it's only implicitly implied in the <Link> modules. See https://github.com/rackt/react-redux/blob/v4.0.0/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux.
	};
}



export default connect(select)(NavModule);