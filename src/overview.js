import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Modal, Card, Table } from 'react-bootstrap';
import axios from './axios';
import { Link } from 'react-router-dom';

export default function Overview({ first, id }) {
	const [ budgets, setBudgets ] = useState([]);
	const [ show, setShow ] = useState(false);
	const [ activeBudget, setActiveBudget ] = useState('');

	const handleClose = () => setShow(false);

	const handleShow = (budget) => setShow(budget);

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

	const deleteBudget = (id) => {
		(async () => {
			const { data } = await axios.delete(`/api/delete/${id}`, {}).then(({ data }) => {
				if (data.success) {
					location.replace('/');
				}
			});
		})();
	};

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
				{budgets.length > 1 && (
					<Row>
						<Col lg={1} />
						<Col lg={10}>
							<h3 className="previousBudgets">These are your previous {budgets.length} budgets!</h3>
						</Col>
						<Col lg={1} />
					</Row>
				)}

				{budgets.length == 1 && (
					<Row>
						<Col lg={1} />
						<Col lg={10}>
							<h3 className="previousBudgets">This is your previous budget!</h3>
						</Col>
						<Col lg={1} />
					</Row>
				)}
				<Row>
					{budgets.map((budget) => (
						<Col lg={4}>
							<div className="overviewBudgetsContainer">
								<Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
									<Tab eventKey="home" title="Overview">
										<Card>
											<Card.Img variant="top" src="/assets/euro.png" />
											<Card.Body>
												<Card.Title>
													<h4 className="h4inoverview">Budget Id {budget.id}</h4>
												</Card.Title>

												<Button variant="info" className="incomeBtn" size="lg" block>
													{' '}
													Total Expenses {' '}
													{budget.outgo1 +
														budget.outgo2 +
														budget.outgo3 +
														budget.outgo4 +
														budget.outgo5 +
														budget.outgo6 +
														budget.outgo7 +
														budget.outgo8}{' '}
													€
												</Button>
											</Card.Body>
										</Card>
									</Tab>

									<Tab eventKey="income" title="Income">
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>Concept</th>
													<th>Amount</th>
												</tr>
											</thead>
											<tbody>
												{budget.income1 !== 0 &&
												budget.income1 && (
													<tr>
														<td>Income 1</td>
														<td>{budget.income1} €</td>
													</tr>
												)}

												{budget.income2 !== 0 &&
												budget.income2 && (
													<tr>
														<td>Income 2</td>
														<td>{budget.income2} €</td>
													</tr>
												)}
											</tbody>
										</Table>
									</Tab>
									<Tab eventKey="expenses" title="Expenses">
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>Concept</th>
													<th>Amount</th>
												</tr>
											</thead>
											<tbody>
												{budget.outgo1 !== 0 &&
												budget.outgo1 && (
													<tr>
														<td>Housing</td>
														<td>{budget.outgo1} €</td>
													</tr>
												)}
												{budget.outgo2 !== 0 &&
												budget.outgo2 && (
													<tr>
														<td>Food</td>
														<td>{budget.outgo2} €</td>
													</tr>
												)}
												{budget.outgo3 !== 0 &&
												budget.outgo3 && (
													<tr>
														<td>Transportation</td>
														<td>{budget.outgo3} €</td>
													</tr>
												)}
												{budget.outgo4 !== 0 &&
												budget.outgo4 && (
													<tr>
														<td>Clothes</td>
														<td>{budget.outgo4} €</td>
													</tr>
												)}

												{budget.outgo5 !== 0 &&
												budget.outgo5 && (
													<tr>
														<td>Insurance</td>
														<td>{budget.outgo5} €</td>
													</tr>
												)}
												{budget.outgo6 !== 0 &&
												budget.outgo6 && (
													<tr>
														<td>Utilities</td>
														<td>{budget.outgo6} €</td>
													</tr>
												)}
												{budget.outgo7 !== 0 &&
												budget.outgo7 && (
													<tr>
														<td>Travel</td>
														<td>{budget.outgo7} €</td>
													</tr>
												)}

												{budget.outgo8 !== 0 &&
												budget.outgo8 && (
													<tr>
														<td>Health and Beauty</td>
														<td>{budget.outgo8} €</td>
													</tr>
												)}
											</tbody>
										</Table>
									</Tab>
								</Tabs>
								<Row>
									<Col lg={6} xs={12}>
										<Link className="noUnderline" to={'/app/edit/' + budget.id}>
											<Button variant="warning" size="sm">
												Edit budget
											</Button>
										</Link>
									</Col>
									<Col lg={6} xs={12}>
										<Button
											variant="danger"
											className="btnToRight"
											size="sm"
											onClick={() => handleShow(budget.id)}
										>
											Delete budget
										</Button>
									</Col>
								</Row>
							</div>
						</Col>
					))}
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Deleting your budget</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Hey {first}! You can't undo this action! Are you sure you want to delete this budget?
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="danger" onClick={() => deleteBudget(show)}>
								Yes, Delete
							</Button>
						</Modal.Footer>
					</Modal>
				</Row>
			</Container>
		</React.Fragment>
	);
}
