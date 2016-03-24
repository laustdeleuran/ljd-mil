'use strict';

/**
 * Log list
 * 
 * @description
 * List log entries
 *
 * @module 'components/modules/log-list'
 * @author ljd
 */

import React from 'react';
import { connect } from 'react-redux';

class LogListModule extends React . Component {

	render() {
		return (
			<div>
				LOG LIST
			</div>
		);
	}

}



LogListModule.propTypes = {
	dispatch: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
	return {};
}



export default connect(mapStateToProps)(LogListModule);