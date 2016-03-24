'use strict';

/**
 * Log view
 * 
 * @description
 * Input data and see/edit earlier data
 *
 * @module 'components/views/log'
 * @author ljd
 */

import React from 'react';

import UserModule from '../../modules/user';

class LogView extends React.Component {
	render () {
		return (
			<div className="o-view o-view--log">
				<UserModule />
			</div>
		);
	}
}

export default LogView;