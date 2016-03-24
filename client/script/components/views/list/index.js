'use strict';

/**
 * List view
 * 
 * @description
 * Create/open vehicle Lists
 *
 * @module 'components/views/list'
 * @author ljd
 */

import React from 'react';

import UserModule from '../../modules/user';

class ListView extends React.Component {
	render () {
		return (
			<div className="o-view o-view--list">
				<UserModule />
			</div>
		);
	}
}

export default ListView;