'use strict';

/**
 * Analysis
 * 
 * @description
 * Analyze log entries
 *
 * @module 'components/modules/analysis'
 * @author ljd
 */

import React from 'react';
import { connect } from 'react-redux';

class AnalysisModule extends React . Component {

	render() {
		return (
			<div>
				Analysis
			</div>
		);
	}

}



AnalysisModule.propTypes = {
	dispatch: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
	return {};
}



export default connect(mapStateToProps)(AnalysisModule);