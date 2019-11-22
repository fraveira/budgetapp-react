import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Form, InputGroup, FormControl, Modal, Button } from 'react-bootstrap';
import axios from './axios';
import Counter from './counter';

export default function Creator({ first, last, id }) {
	const [ income, setIncome ] = useState({});
	const [ expenses, setExpenses ] = useState({});
	const [ sumIncome, setSumIncome ] = useState(0);
	const [ sumExpenses, setSumExpenses ] = useState(0);
	// For the help modal
	const [ show, setShow ] = useState(false);
	const handleClose = () => setShow(false);

	useEffect(
		() => {
			if (!id) {
				return;
			}
			(async () => {
				await axios.get(`/api/initialstatus/${id}`).then(({ data }) => {
					if (data.success == true) {
						setShow(false);
					} else {
						setShow(true);
					}
				});
			})();
		},
		[ id ]
	);

	useEffect(
		() => {
			let sumOfIncomes = Object.values(income).reduce((a, b) => a + b, 0);
			setSumIncome(sumOfIncomes);
			let sumOfExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
			setSumExpenses(sumOfExpenses);
		},
		[ income, expenses ]
	);
	const keyCheckIncome = (e) => {
		if (e.key === 'Enter' || e.key === 'Tab') {
			setIncome({
				...income,
				[e.target.name]: Number(e.target.value)
			});
		}
	};

	const keyCheckExpenses = (e) => {
		if (e.key === 'Enter' || e.key === 'Tab') {
			setExpenses({
				...expenses,
				[e.target.name]: Number(e.target.value)
			});
		}
	};

	return (
		<React.Fragment>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Need help?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h5>Instructions to create your first Zero-Based Budget!</h5>
					<p>A Zero-Based budget is a bit special: </p>
					<p>
						- your income minus your expenses <strong>MUST equal zero.</strong>{' '}
					</p>
					<p>
						- that means you have to <strong>allocate EVERY EURO</strong> inside a category
					</p>
					<p>- the program won't let you save the budget otherwise</p>
					<p>
						- if there's some money you don't want to spend, allocate it inside the{' '}
						<strong>Savings Category!</strong>
					</p>
					<p>
						- if you miss any important category, rest assured I am working on adding custom categories in
						the near future
					</p>
					<a href="https://www.youtube.com/watch?v=PvErAzTOwk4">Learn more here</a>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Let me budget
					</Button>
				</Modal.Footer>
			</Modal>
			<Container>
				<Row>
					<Col md={7}>
						<Form className="leftColCreatorEditor">
							<Row>
								<Col>
									<h3 className="h3increator">Income 1</h3>
									<InputGroup className="formBetween">
										<InputGroup.Prepend>
											<InputGroup.Text id="inputGroupPrepend">€</InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											placeholder="Press ENTER or TAB to save"
											type="number"
											name="income1"
											defaultValue=""
											onKeyDown={keyCheckIncome}
										/>
										<InputGroup.Append>
											{income.income1 && <InputGroup.Text>{income.income1} €</InputGroup.Text>}
										</InputGroup.Append>
									</InputGroup>
								</Col>
								<Col>
									<h3 className="h3increator">Income 2</h3>
									<InputGroup>
										<InputGroup.Prepend>
											<InputGroup.Text id="inputGroupPrepend">€</InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											placeholder="Press ENTER or TAB to save"
											type="number"
											name="income2"
											defaultValue=""
											onKeyDown={keyCheckIncome}
										/>
										<InputGroup.Append>
											{income.income2 && <InputGroup.Text>{income.income2} €</InputGroup.Text>}
										</InputGroup.Append>
									</InputGroup>
								</Col>
							</Row>
						</Form>
						<Form>
							<h2 className="regh2">EXPENSES</h2>
							<h3 className="h3increator">Housing</h3>
							<InputGroup className="mb-3">
								<InputGroup.Prepend>
									<InputGroup.Text>€</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									placeholder="Press ENTER or TAB to save"
									type="number"
									name="outgo1"
									onKeyDown={keyCheckExpenses}
								/>
								<InputGroup.Append>
									{expenses.outgo1 && <InputGroup.Text>{expenses.outgo1} €</InputGroup.Text>}
								</InputGroup.Append>
							</InputGroup>
							<h3 className="h3increator">Food</h3>
							<InputGroup className="mb-3">
								<InputGroup.Prepend>
									<InputGroup.Text>€</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									placeholder="Press ENTER or TAB to save"
									type="number"
									name="outgo2"
									onKeyDown={keyCheckExpenses}
								/>
								<InputGroup.Append>
									{expenses.outgo2 && <InputGroup.Text>{expenses.outgo2} €</InputGroup.Text>}
								</InputGroup.Append>
							</InputGroup>
							<h3 className="h3increator">Transportation</h3>
							<InputGroup className="mb-3">
								<InputGroup.Prepend>
									<InputGroup.Text>€</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									placeholder="Press ENTER or TAB to save"
									type="number"
									name="outgo3"
									onKeyDown={keyCheckExpenses}
								/>
								<InputGroup.Append>
									{expenses.outgo3 && <InputGroup.Text>{expenses.outgo3} €</InputGroup.Text>}
								</InputGroup.Append>
							</InputGroup>
							<h3 className="h3increator">Clothes</h3>
							<InputGroup className="mb-3">
								<InputGroup.Prepend>
									<InputGroup.Text>€</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									placeholder="Press ENTER or TAB to save"
									type="number"
									name="outgo4"
									onKeyDown={keyCheckExpenses}
								/>
								<InputGroup.Append>
									{expenses.outgo4 && <InputGroup.Text>{expenses.outgo4} €</InputGroup.Text>}
								</InputGroup.Append>
							</InputGroup>
							<h3 className="h3increator">Insurance</h3>
							<InputGroup className="mb-3">
								<InputGroup.Prepend>
									<InputGroup.Text>€</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									placeholder="Press ENTER or TAB to save"
									type="number"
									name="outgo5"
									onKeyDown={keyCheckExpenses}
								/>
								<InputGroup.Append>
									{expenses.outgo5 && <InputGroup.Text>{expenses.outgo5} €</InputGroup.Text>}
								</InputGroup.Append>
							</InputGroup>
							<h3 className="h3increator">Utilities</h3>
							<InputGroup className="mb-3">
								<InputGroup.Prepend>
									<InputGroup.Text>€</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									placeholder="Press ENTER or TAB to save"
									type="number"
									name="outgo6"
									onKeyDown={keyCheckExpenses}
								/>
								<InputGroup.Append>
									{expenses.outgo6 && <InputGroup.Text>{expenses.outgo6} €</InputGroup.Text>}
								</InputGroup.Append>
							</InputGroup>
							<h3 className="h3increator">Travel</h3>
							<InputGroup className="mb-3">
								<InputGroup.Prepend>
									<InputGroup.Text>€</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									placeholder="Press ENTER or TAB to save"
									type="number"
									name="outgo7"
									onKeyDown={keyCheckExpenses}
								/>
								<InputGroup.Append>
									{expenses.outgo7 && <InputGroup.Text>{expenses.outgo7} €</InputGroup.Text>}
								</InputGroup.Append>
							</InputGroup>
							<h3 className="h3increator">Savings and Debts</h3>
							<InputGroup className="mb-3">
								<InputGroup.Prepend>
									<InputGroup.Text>€</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									placeholder="Press ENTER or TAB to save"
									type="number"
									name="outgo8"
									onKeyDown={keyCheckExpenses}
								/>
								<InputGroup.Append>
									{expenses.outgo8 && <InputGroup.Text>{expenses.outgo8} €</InputGroup.Text>}
								</InputGroup.Append>
							</InputGroup>
						</Form>
					</Col>
					<Col md={5}>
						<Navbar sticky="top" className="stickyCounter">
							<Counter
								totalIncome={sumIncome}
								totalOutgo={sumExpenses}
								theIncome={income}
								theOutgo={expenses}
								userId={id}
							/>
						</Navbar>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}
