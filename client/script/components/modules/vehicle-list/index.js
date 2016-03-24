'use strict';

/**
 * Vehicles list
 * 
 * @description
 * List vehicles
 *
 * @module 'components/modules/vehicle-list'
 * @author ljd
 */

import React from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router';

import { fetchVehiclesIfNeeded } from '../../../actions/vehicles';

class VehicleListModule extends React . Component {

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(fetchVehiclesIfNeeded());
	}

	renderItems() {
		const { vehicles } = this.props;

		if (vehicles && vehicles.length) {
			return vehicles.map(vehicle => <li className="c-list__item c-list__item--empty" key={ vehicle._id }>{ vehicle.name }</li>);
		} else {
			return <li className="c-list__item c-list__item--empty">You have no vehicles yet. Add one!</li>;
		}
	}

	render() {
		return (
			<ul className="c-list o-block-list">
				{ this.renderItems() }
			</ul>
			);
	}

}



VehicleListModule.propTypes = {
	vehicles: React.PropTypes.array,
	dispatch: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
	return {
		vehicles: state.vehicles.data
	};
}



export default connect(mapStateToProps)(VehicleListModule);