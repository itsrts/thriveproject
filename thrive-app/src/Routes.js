import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './components/pages/LoginPage';

import RideListPage from './components/pages/RideListPage';

class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route path='/' exact component={RideListPage} />
				<Route path='/login' exact component={LoginPage} />
				<Route path='/rides' exact component={RideListPage} />
			</Switch>
		);
	}
}

export default Routes;
