import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Register from './register';
import Login from './login';

export default function Welcome() {
	return (
		<div>
			<img src="/assets/reactlogo" />
			<h2>Welcome to your Budgeting app!</h2>
			<HashRouter>
				<div>
					<Route exact path="/" component={Register} />
					<Route path="/login" component={Login} />
				</div>
			</HashRouter>
		</div>
	);
}
