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
import { Link } from 'react-router';

class VehicleModule extends React . Component {

	render() {
		const { children, id } = this.props; 

		return (
			<div>

				<nav className="c-subnav">
					<ul className="c-subnav__list o-flat-list">
						<li><Link to={ '/vehicle/' + id + '/log' } className="c-subnav__link" activeClassName="c-subnav__link--active">Log</Link></li>
						<li><Link to={ '/vehicle/' + id + '/stats' } className="c-subnav__link" activeClassName="c-subnav__link--active">Stats</Link></li>
					</ul>
				</nav>

				{ children }

			</div>
		);
	}

}



VehicleModule.propTypes = {
	id: React.PropTypes.string.isRequired,
	children: React.PropTypes.element,
	dispatch: React.PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
	return {
		id: ownProps.params.id
	};
}



export default connect(mapStateToProps)(VehicleModule);