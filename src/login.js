import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
import { Button, Form, Col, Row, Container, Alert } from 'react-bootstrap';

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
					location.replace('/app/overview');
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
			<React.Fragment>
				{this.state.error && <Alert variant="danger">Oops, something went wrong with your credentials</Alert>}
				<Container>
					<Row>
						<Col />
						<Col xs={6}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									name="email"
									type="email"
									placeholder="E-mail"
									id="email"
									onChange={(e) => this.handleChange(e)}
								/>
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									name="password"
									type="password"
									placeholder="Password"
									id="password"
									onChange={(e) => this.handleChange(e)}
								/>
							</Form.Group>
							<Button variant="success" type="submit" size="lg" onClick={() => this.submit()}>
								Log in
							</Button>
							<Link to="/"> or Register</Link>
						</Col>
						<Col />
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}
