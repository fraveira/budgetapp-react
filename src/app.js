import React from 'react';
import axios from './axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './header';

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
						<p>Hi there, {this.state.first}</p>

						{/* <Route
							exact
							path="/"
							render={(props) => (
								<section>
									<Profile
										id={this.state.id}
										first={this.state.first}
										last={this.state.last}
										profilepicture={this.state.profilepicture}
										onClick={this.showUploader}
										bio={this.state.bio}
										setBio={this.setBio}
										toggleModal={() => this.toggleModal()}
									/>
									{this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
								</section>
							)}
						/> */}

						{/* <Route
							path="/user/:id"
							render={(props) => (
								<OtherProfile key={props.match.url} match={props.match} history={props.history} />
							)}
						/> */}
					</React.Fragment>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}
