import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Modal } from 'react-bootstrap';
import axios from './axios';
import { Link } from 'react-router-dom';

export default function Overview({ first, id }) {
	const [ budgets, setBudgets ] = useState([]);
	const [ show, setShow ] = useState(false);
	const [ activeBudget, setActiveBudget ] = useState('');

	const handleClose = () => setShow(false);
	// const setActiveBudget = (budget) => budget({ activeBudget: budget });

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
								<Row>
									<Col lg={6} xs={12}>
										<Link className="noUnderline" to={'/app/edit/' + budget.id}>
											<Button variant="warning" size="sm">
												Edit budget
											</Button>
										</Link>
									</Col>
									<Col lg={6} xs={12}>
										<Button variant="danger" size="sm" onClick={() => handleShow(budget.id)}>
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
							Hey {first}! You can't undo this action! Are you sure you want to delete this budget {show}?
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
