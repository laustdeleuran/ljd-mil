'use strict';

/**
 * Vehicle
 * 
 * @description
 * Wrapper for single vehicle
 *
 * @module 'components/modules/vehicle'
 * @author ljd
 */

import React from 'react';
import { connect } from 'react-redux';

class VehicleModule extends React . Component {

	render() {
		const { children } = this.props; 

		return (
			<div>
				VEHICLE
				{ children }
			</div>
		);
	}

}



VehicleModule.propTypes = {
	children: React.PropTypes.element,
	dispatch: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
	return {};
}



export default connect(mapStateToProps)(VehicleModule);