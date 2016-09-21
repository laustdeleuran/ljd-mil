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
 
import '../../../../style/components/_drawer.scss';

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { toggleDrawer } from '../../../actions/drawer';

class DrawerModule extends React.Component {

	onToggleClick () {
		const { dispatch } = this.props;

		dispatch(toggleDrawer());
	}
	
	render () {
		const { visible, children } = this.props;

		return (
			<section className={ classNames('c-drawer', { 'c-drawer--hidden': !visible }) }>
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



function mapStateToProps(state) {
	return {
		visible: state.drawer
	};
}



export default connect(mapStateToProps)(DrawerModule);