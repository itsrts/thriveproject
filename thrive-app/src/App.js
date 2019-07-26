import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../src/Routes';

function App() {
	return (
		<div className="App">
			<div id="loader" className="loader"></div>
			<Router>
				<main id="content" className="p-3"><Routes /></main>
			</Router>
		</div>
	);
}

export default App;
