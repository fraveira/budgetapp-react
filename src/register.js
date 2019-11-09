import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class Register extends React.Component {
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
			.post('/register', {
				username: this.state.username,
				first: this.state.first,
				last: this.state.last,
				email: this.state.email,
				password: this.state.password
			})
			.then(({ data }) => {
				if (data.success) {
					location.replace('/');
				} else {
					this.setState({
						error: true
					});
				}
			});
	}

	render() {
		return (
			<div>
				{this.state.error && <div className="error"> Oops! That was your fault</div>}
				<input
					name="username"
					placeholder="Your Username"
					id="username"
					onChange={(e) => this.handleChange(e)}
				/>
				<input name="first" placeholder="First Name" id="first" onChange={(e) => this.handleChange(e)} />
				<input name="last" placeholder="Last Name" id="last" onChange={(e) => this.handleChange(e)} />
				<input
					type="email"
					name="email"
					placeholder="E-mail"
					id="email"
					onChange={(e) => this.handleChange(e)}
				/>
				<input
					name="password"
					placeholder="Password"
					id="password"
					type="password"
					onChange={(e) => this.handleChange(e)}
				/>
				<button onClick={() => this.submit()}>Submit</button>
				<Link to="/login">or Log in!</Link>
			</div>
		);
	}
}
