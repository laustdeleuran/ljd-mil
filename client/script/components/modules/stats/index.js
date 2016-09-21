'use strict';

/**
 * stats
 * 
 * @description
 * Analyze log entries
 *
 * @module 'components/modules/stats'
 * @author ljd
 */

import React from 'react';
import { connect } from 'react-redux';

class StatsModule extends React . Component {

	render() {
		return (
			<div>
				Statistics is coming! Be patient and drive carefully!
			</div>
		);
	}

}



StatsModule.propTypes = {
	dispatch: React.PropTypes.func.isRequired
};


function mapStateToProps() { // state, ownProps
	return {};
}



export default connect(mapStateToProps)(StatsModule);