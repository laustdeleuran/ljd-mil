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

import DrawerModule from '../../modules/drawer';
import NavModule from '../../modules/nav';
import FooterModule from '../../modules/footer';

function CoreLayout({children}) {
	return (
		<div className="c-layout c-layout--core">
			<DrawerModule>
				<NavModule />
			</DrawerModule>
			<div className="c-layout__scroller o-scroller o-scroller--fit">
				<main className="c-layout__view">
					{children}
				</main>
				<FooterModule />
			</div>
		</div>
	);
}

CoreLayout.propTypes = {
	children: React.PropTypes.element
};

export default CoreLayout;