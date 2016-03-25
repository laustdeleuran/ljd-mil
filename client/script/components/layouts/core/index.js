'use strict';

/**
 * Core layout
 * 
 * @description
 * Based on https://github.com/davezuko/react-redux-starter-kit/blob/master/src/layouts/CoreLayout.js, this component is a [stateless function](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)
 *
 * @module 'components/layouts/core'
 * @author ljd
 */

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';

import UserModule from '../../modules/user';
import DrawerModule from '../../modules/drawer';
import NavModule from '../../modules/nav';
import FooterModule from '../../modules/footer';

class CoreLayout extends React.Component {
	render () {
		const { drawerVisible, children } = this.props;

		return (
			<div className={ classNames('c-layout', 'c-layout--core', { 'c-layout--drawer': drawerVisible }) }>
				<DrawerModule>
					<NavModule />
				</DrawerModule>
				<div className="c-layout__scroller o-scroller o-scroller--fit">
					<main className="c-layout__view">
						{ children }
					</main>
					<UserModule />
					<FooterModule />
				</div>
			</div>
		);
	}
}


CoreLayout.propTypes = {
	children: React.PropTypes.element,
	drawerVisible: React.PropTypes.bool
};



function mapStateToProps(state) {
	return {
		drawerVisible: state.drawer
	};
}



export default connect(mapStateToProps)(CoreLayout);