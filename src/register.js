import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

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
			<React.Fragment>
				{this.state.error && <div className="error"> Oops! That was your fault</div>}
				<Form.Group>
					<Form.Label>Username</Form.Label>
					<Form.Control name="username" placeholder="Your Username" onChange={(e) => this.handleChange(e)} />
				</Form.Group>

				<Form.Group>
					<Form.Label>First Name</Form.Label>
					<Form.Control name="first" placeholder="First Name" onChange={(e) => this.handleChange(e)} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Last Name</Form.Label>
					<Form.Control name="last" placeholder="Last Name" onChange={(e) => this.handleChange(e)} />
				</Form.Group>

				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						name="email"
						placeholder="E-mail"
						onChange={(e) => this.handleChange(e)}
					/>
					<Form.Text className="text-muted">Enter a valid e-mail</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						placeholder="Password"
						type="password"
						onChange={(e) => this.handleChange(e)}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="I accept the Terms and Conditions" />
				</Form.Group>
				<Button variant="primary" type="submit" onClick={() => this.submit()}>
					Create an account
				</Button>
				<Link to="/login">or Log in!</Link>
			</React.Fragment>
		);
	}
}
