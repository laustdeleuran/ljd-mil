'use strict';

/**
 * login layout
 * 
 * @description
 * Based on https://github.com/davezuko/react-redux-starter-kit/blob/master/src/layouts/CoreLayout.js, this component is a [stateless function](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)
 *
 * @module 'components/layouts/login'
 * @author ljd
 */
 
import '../../../../style/components/_layout.scss';

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import FooterModule from '../../modules/footer';

class LoginLayout extends React.Component {
	render () {
		const { children } = this.props;

		return (
			<div className={ classNames('c-layout', 'c-layout--login') }>
				<div className="c-layout__scroller o-scroller o-scroller--fit">
					<main className="c-layout__view">
						{ children }
					</main>
					<FooterModule />
				</div>
			</div>
		);
	}
}



LoginLayout.propTypes = {
	children: React.PropTypes.element
};



export default connect()(LoginLayout);