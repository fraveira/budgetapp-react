import React from 'react';
import axios from './axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './header';
import Overview from './overview';
import Creator from './creator';
import Editor from './editor';
import Savings from './savings';

export class App extends React.Component {
	constructor() {
		super();
		this.state = {
			first: '',
			last: '',
			id: ''
		};
	}

	async componentDidMount() {
		axios.get('/user').then(({ data }) => {
			this.setState(data);
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
									<Overview first={this.state.first} id={this.state.id} />
								</section>
							)}
						/>

						<Route
							exact
							path="/app/create"
							render={(props) => (
								<section>
									<Creator first={this.state.first} last={this.state.last} id={this.state.id} />
								</section>
							)}
						/>
						<Route
							path="/app/edit/:id"
							render={(props) => (
								<Editor
									key={props.match.url}
									match={props.match}
									history={props.history}
									id={this.state.id}
								/>
							)}
						/>
						<Route
							exact
							path="/app/savingfunds/"
							render={(props) => (
								<Savings
									key={props.match.url}
									match={props.match}
									history={props.history}
									id={this.state.id}
									first={this.state.first}
								/>
							)}
						/>
					</React.Fragment>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}
