import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleChange({ target }) {
		this.setState({
			[target.name]: target.value
		});
	}

	submit() {
		axios
			.post('/login', {
				email: this.state.email,
				password: this.state.password
			})
			.then(({ data }) => {
				if (data.success) {
					console.log('Login succesful');
					location.replace('/');
				} else {
					this.setState({
						error: true
					});
				}
			})
			.catch((error) => {
				console.log('Error logging in', error);
				this.setState({
					error: true
				});
			});
	}

	render() {
		return (
			<div>
				{this.state.error && <div className="error"> Oops! That was your fault</div>}
				<input
					name="email"
					type="email"
					placeholder="E-mail"
					id="email"
					onChange={(e) => this.handleChange(e)}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					id="password"
					onChange={(e) => this.handleChange(e)}
				/>
				<button onClick={() => this.submit()}>Submit</button>
				<Link to="/">or Register</Link>
			</div>
		);
	}
}
