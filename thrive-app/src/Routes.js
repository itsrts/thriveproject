import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './components/pages/LoginPage';

class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route path='/login' exact component={LoginPage} />
			</Switch>
		);
	}
}

export default Routes;
