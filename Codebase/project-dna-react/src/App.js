import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import CreateProjectPage from './components/pages/CreateProjectPage';

const App = () => (
	<div>
		<Route path="/" exact component={HomePage} />
		<Route path="/login" exact component={LoginPage} />
		<Route path="/dashboard" exact component={DashboardPage} />
		<Route
			path="/dashboard/create-project"
			exact
			component={CreateProjectPage}
		/>
	</div>
);

export default App;
