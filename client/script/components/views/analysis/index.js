'use strict';

/**
 * Analysis view
 * 
 * @description
 * Pretty graphs and KPIs
 *
 * @module 'components/views/analysis'
 * @author ljd
 */

import React from 'react';

import UserModule from '../../modules/user';

class AnalysisView extends React.Component {
	render () {
		return (
			<div className="o-view o-view--analysis">
				<UserModule />
			</div>
		);
	}
}

export default AnalysisView;