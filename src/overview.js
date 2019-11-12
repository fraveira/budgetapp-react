import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import axios from './axios';
import { Link } from 'react-router-dom';

export default function Overview({ first, id }) {
	const [ budgets, setBudgets ] = useState([]);
	console.log('This is the user id', id);

	useEffect(
		() => {
			if (!id) {
				return;
			}
			(async () => {
				const { data } = await axios.get(`/api/budgets/${id}`);
				setBudgets(data);
				console.log('Data is coming!', data);
			})();
		},
		[ id ]
	);

	return (
		<React.Fragment>
			<Container>
				<Row>
					<Col />
					<Col xs={6} className="creatorBtn">
						<Link className="noUnderline" to="/app/create">
							<Button variant="success" size="lg" block>
								Create your first budget, {first}!
							</Button>
						</Link>
					</Col>
					<Col />
				</Row>
				<Row>
					<Col lg={1} />
					<Col lg={10}>
						<h3 className="previousBudgets">These are your previous budgets!</h3>
					</Col>
					<Col lg={1} />
				</Row>
				<Row>
					{budgets.map((budget) => (
						<Col lg={4}>
							<div className="overviewBudgetsContainer">
								<Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
									<Tab eventKey="home" title="Overview">
										<p>Lorem Ipsum</p>
										<p>Your budget with id {budget.id} is rendered!</p>
									</Tab>

									<Tab eventKey="income" title="Income">
										<p>Lorem Ipsum</p>
									</Tab>
									<Tab eventKey="expenses" title="Expenses" disabled>
										<p>Lorem Ipsum</p>
									</Tab>
								</Tabs>
							</div>
						</Col>
					))}
				</Row>
			</Container>
		</React.Fragment>
	);
}
