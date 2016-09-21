'use strict';

/**
 * Footer
 * 
 * @description
 * Site footer
 *
 * @module 'components/modules/footer'
 * @author ljd
 */

import '../../../../style/components/_footer.scss';

import React from 'react';

class FooterModule extends React.Component {
	
	render () {
		return (
			<footer className="c-footer">
				Built by <a href="http://ljd.dk" className="c-footer__link">LJD</a>
			</footer>
		);
	}

}

export default FooterModule;