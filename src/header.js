import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';

export default function Header({ first }) {
	return (
		<React.Fragment>
			<Navbar sticky="top" bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="/app/overview">Budgematic</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/app/overview">Home</Nav.Link>
						<Nav.Link>Ready to budget, {first}? </Nav.Link>
						<NavDropdown title="Control Panel" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Saving Funds</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Debts</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search budgets" className="mr-sm-2" />
						<Button variant="outline-light">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</React.Fragment>
	);
}
