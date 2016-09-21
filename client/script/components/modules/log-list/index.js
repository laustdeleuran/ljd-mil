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
import moment from 'moment';
import { connect } from 'react-redux';
import classNames from 'classnames';
//import { push } from 'react-router-redux';

import { addLog, fetchLogsIfNeeded } from '../../../actions/logs';

class LogListModule extends React . Component {

	constructor() {
		super();
		this.state = {
			date: moment().format('YYYY-MM-DD')
		};
	}

	componentWillMount() {
		const { dispatch, vehicle, id } = this.props;

		if (!vehicle) {
			//dispatch(push('/'));
		} 
		dispatch(fetchLogsIfNeeded(id));
	}

	onAddSubmit(event) {
		if (event) {
			event.preventDefault();
		}

		const { distance, volume, price, date } = this.state;
		const { id, dispatch } = this.props;

		dispatch(addLog({
			distance,
			volume,
			price,
			date,
			_vehicle: id
		}));

		this.setState({
			distance: null,
			volume: null,
			price: null,
			date: moment().format('YYYY-MM-DD')
		});
	}

	handleChange(name, event) {
		this.setState({
			[name]: event.target.value
		});
	}

	renderItems() {
		const { logs } = this.props;

		if (logs && logs.length) {
			return logs.map(log => 
				<li className="c-list__item" key={ log._id }>
					<em className="o-label o-label--primary">{ moment(log.date).format('MM/DD/YY') }</em>
					<span className="o-seperator"> &ndash; </span> 
					<span className="o-label">Distance:</span> { log.distance }
					<span className="o-seperator"> &ndash; </span> 
					<span className="o-label">Gas:</span> { log.volume }
					<span className="o-seperator"> &ndash; </span>
					<span className="o-label">Price:</span> { log.price || '?' }
				</li>
			);
		} else {
			return <li className="c-list__item c-list__item--empty">You have no log entries yet. Add one!</li>;
		}
	}

	render() {
		var { distance, volume, price, date } = this.state;
		const { isFetching } = this.props;

		return (
			<div className="c-list">

				<ul className="c-list__list o-block-list">
					{ this.renderItems() }
				</ul>

				<form onSubmit={ (event) => this.onAddSubmit(event) } className={ classNames('c-create', { 'c-create--loading': isFetching }) }>
					<input type="number" value={ distance } onChange={ (event) => this.handleChange('distance', event) } name="name" placeholder="Distance" className="c-create__input" step="any" required />
					<input type="number" value={ volume } onChange={ (event) => this.handleChange('volume', event) } name="name" placeholder="Gas volume (gallons)" className="c-create__input" step="any" required />
					<input type="number" value={ price } onChange={ (event) => this.handleChange('price', event) } name="name" placeholder="Price" className="c-create__input" step="any" />
					<input type="date" value={ date } onChange={ (event) => this.handleChange('date', event) } name="date" className="c-create__input" required />

					<button className="c-create__btn o-btn o-btn--medium">Add log entry</button>
				</form>

			</div>
		);
	}

}



LogListModule.propTypes = {
	logs: React.PropTypes.array,
	isFetching: React.PropTypes.bool,
	vehicle: React.PropTypes.object,
	id: React.PropTypes.string.isRequired,
	dispatch: React.PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
	var id = ownProps.params.id;
	return {
		id,
		vehicle: state.vehicles.list && state.vehicles.list.find(vehicle => vehicle._id === id),
		isFetching: state.logsByVehicle[id] && state.logsByVehicle[id].isFetching,
		logs: state.logsByVehicle[id] && state.logsByVehicle[id].logs
	};
}



export default connect(mapStateToProps)(LogListModule);