'use strict';

/**
 * Vehicles create
 * 
 * @description
 * Create form for vehicles
 *
 * @module 'components/modules/vehicle-create'
 * @author ljd
 */

import React from 'react';
import { connect } from 'react-redux';

class VehicleCreateModule extends React . Component {

	render() {
		return (
			<div>
				VEHICLE CREATE
			</div>
		);
	}

}



VehicleCreateModule.propTypes = {
	dispatch: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
	return {};
}



export default connect(mapStateToProps)(VehicleCreateModule);