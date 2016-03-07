'use strict';

/**
 * Drawer
 * 
 * @description
 * Open drawer
 *
 * @module 'components/modules/drawer'
 * @author ljd
 */

import React from 'react';
import { connect } from 'react-redux';
import { toggleDrawer } from '../../../actions';

class DrawerModule extends React.Component {

	onToggleClick () {
		const { dispatch } = this.props;

		dispatch(toggleDrawer());
	}
	
	render () {
		const { visible, children } = this.props;

		return (
			<section className={ visible ? 'c-drawer' : 'c-drawer c-drawer--hidden'}>
				<div className="c-drawer__content o-scroller">{children}</div>
				<a className="c-drawer__toggle" onClick={() => this.onToggleClick()}>Toggle</a>
			</section>
		);
	}

}


DrawerModule.propTypes = {
	dispatch: React.PropTypes.func.isRequired,
	children: React.PropTypes.element,
	visible: React.PropTypes.bool
};



function select(state) {
	return {
		visible: state.distortion.drawer
	};
}



export default connect(select)(DrawerModule);