import React from 'react';
import axios from './axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './header';
import Overview from './overview';
import Creator from './creator';
import { Button, Container, Row, Col } from 'react-bootstrap';

export class App extends React.Component {
	constructor() {
		super();
		this.state = {
			first: '',
			last: ''
		};
	}

	async componentDidMount() {
		axios.get('/user').then(({ data }) => {
			this.setState(data);
			console.log('Data is this:', data);
		});
	}

	methodInApp() {}

	render() {
		return (
			<React.Fragment>
				<BrowserRouter>
					<React.Fragment>
						<Header first={this.state.first} />

						<Route
							exact
							path="/app/overview"
							render={(props) => (
								<section>
									<Overview first={this.state.first} />
								</section>
							)}
						/>

						<Route
							exact
							path="/app/create"
							render={(props) => (
								<section>
									<Creator first={this.state.first} />
								</section>
							)}
						/>
					</React.Fragment>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}
