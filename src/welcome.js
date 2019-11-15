import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Register from './register';
import Login from './login';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown, Col, Row, Container } from 'react-bootstrap';

export default function Welcome() {
	return (
		<React.Fragment>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="/welcome" className="webLogo">
					<img src="/assets/budgetactwhite.png" alt="BudgetACT logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/register">Home</Nav.Link>
						<Nav.Link href="/register">Register</Nav.Link>
						<Nav.Link href="/register">Login</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Container>
				<Row>
					<Col />
					<Col xs={6}>
						<img className="homeLogos" src="/assets/budgetactblack.png" />
						<h2 className="regh2">Start budgeting with us!</h2>
					</Col>
					<Col />
				</Row>
			</Container>
			<HashRouter>
				<div>
					<Route exact path="/" component={Register} />
					<Route path="/login" component={Login} />
				</div>
			</HashRouter>
		</React.Fragment>
	);
}
