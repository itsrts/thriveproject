import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../src/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div className="App">
			<ToastContainer />
			<div id="loader" className="loader"></div>
			<Router>
				<main id="content" className="p-3"><Routes /></main>
			</Router>
		</div>
	);
}

export default App;
