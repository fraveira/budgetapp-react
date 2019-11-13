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
								Create a new budget, {first}!
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
										<p>Total Income {budget.income1 + budget.income2}</p>
										<p>Your budget with id {budget.id} is rendered!</p>
										<p>Here we can display the pie chart</p>
										<p>
											{' '}
											Total Expenses {' '}
											{budget.outgo1 +
												budget.outgo2 +
												budget.outgo3 +
												budget.outgo4 +
												budget.outgo5 +
												budget.outgo6 +
												budget.outgo7 +
												budget.outgo8}
										</p>
									</Tab>

									<Tab eventKey="income" title="Income">
										{budget.income1 && <p>Income 1 {budget.income1}</p>}
										{budget.income2 !== 0 && <p>Income 2 {budget.income2}</p>}
									</Tab>
									<Tab eventKey="expenses" title="Expenses">
										{budget.outgo1 && <p>Housing {budget.outgo1}</p>}
										{budget.outgo2 && <p>Food {budget.outgo2}</p>}
										{budget.outgo3 && <p>Transportation {budget.outgo3}</p>}
										{budget.outgo4 && <p>Clothes {budget.outgo4}</p>}
										{budget.outgo5 && <p>Insurance {budget.outgo5}</p>}
										{budget.outgo6 && <p>Utilities {budget.outgo6}</p>}
										{budget.outgo7 && <p>Travel {budget.outgo7}</p>}
										{budget.outgo8 && <p>Health and Beauty {budget.outgo8}</p>}
									</Tab>
								</Tabs>
							</div>
							<Row>
								<Col lg={6} xs={12}>
									<Link className="noUnderline" to={'/app/edit/' + budget.id}>
										<Button variant="warning">Edit your Budget</Button>
									</Link>
								</Col>
								<Col lg={6} xs={12}>
									<Link className="noUnderline" to={'/app/delete/' + budget.id}>
										<Button variant="danger">Delete this Budget</Button>
									</Link>
								</Col>
							</Row>
						</Col>
					))}
				</Row>
			</Container>
		</React.Fragment>
	);
}
