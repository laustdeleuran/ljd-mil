'use strict';

/**
 * Log create
 * 
 * @description
 * Create form for logs
 *
 * @module 'components/modules/log-create'
 * @author ljd
 */

import React from 'react';
import { connect } from 'react-redux';

class LogCreateModule extends React . Component {

	render() {
		return (
			<div>
				Log CREATE
			</div>
		);
	}

}



LogCreateModule.propTypes = {
	dispatch: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
	return {};
}



export default connect(mapStateToProps)(LogCreateModule);