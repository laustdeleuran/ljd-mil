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

import '../../../../style/objects/_block-list.scss';
import '../../../../style/objects/_btn.scss';
import '../../../../style/components/_list.scss';
import '../../../../style/components/_create.scss';

import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { addVehicle, fetchVehiclesIfNeeded } from '../../../actions/vehicles';

class VehicleListModule extends React.Component {

	constructor() {
		super();
		this.state = {
			date: moment().format('YYYY-MM-DD')
		};
	}

	componentWillMount() {
		const { dispatch } = this.props;

		dispatch(fetchVehiclesIfNeeded());
	}

	handleChange(name, event) {
		this.setState({
			[name]: event.target.value
		});
	}

	onAddSubmit(event) {
		if (event) {
			event.preventDefault();
		}

		const { name, date } = this.state;
		const { session, dispatch } = this.props;

		dispatch(addVehicle({
			name,
			created: date,
			_user: session._id
		}));

		this.setState({
			name: '',
			date: moment().format('YYYY-MM-DD')
		});
	}

	renderItems() {
		const { vehicles } = this.props;

		if (vehicles && vehicles.length) {
			return vehicles.map(vehicle => 
				<li className="c-list__item" key={ vehicle._id }>
					<Link to={ 'vehicle/' + vehicle._id + '/log' } className="c-list__link">{ vehicle.name } <span className="c-list__arrow"></span></Link>
				</li>
			);
		} else {
			return <li className="c-list__item c-list__item--empty">You have no vehicles yet. Add one!</li>;
		}
	}

	render() {
		var { name, date } = this.state;
		const { isFetching } = this.props;

		return (
			<div className="c-list">

				<ul className="c-list__list o-block-list">
					{ this.renderItems() }
				</ul>

				<form onSubmit={ (event) => this.onAddSubmit(event) } className={ classNames('c-create', { 'c-create--loading': isFetching }) }>
					<input type="text" value={ name } onChange={ (event) => this.handleChange('name', event) } name="name" placeholder="Name" className="c-create__input" required />
					<input type="date" value={ date } onChange={ (event) => this.handleChange('date', event) } name="date" className="c-create__input" required />

					<button className="c-create__btn o-btn o-btn--medium">Add vehicle</button>
				</form>

			</div>
			);
	}

}



VehicleListModule.propTypes = {
	isFetching: React.PropTypes.bool,
	session: React.PropTypes.object,
	vehicles: React.PropTypes.array,
	dispatch: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
	return {
		vehicles: state.vehicles.list,
		isFetching: state.vehicles.isFetching,
		session: state.login && state.login.session
	};
}



export default connect(mapStateToProps)(VehicleListModule);