import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Form, InputGroup, FormControl } from 'react-bootstrap';
import Counter from './counter';
import axios from './axios';

export default function Editor(props) {
	const [ income, setIncome ] = useState({});
	const [ expenses, setExpenses ] = useState({});
	const [ sumIncome, setSumIncome ] = useState(0);
	const [ sumExpenses, setSumExpenses ] = useState(0);
	const [ budget, setBudget ] = useState();
	useEffect(() => {
		const budgetId = props.match.params.id;
		(async () => {
			const { data } = await axios.get(`/api/edit/${budgetId}`);
			setBudget(data[0].id);
			let forIncomes = {};
			for (let key in data[0]) {
				if (key.includes('income')) forIncomes[key] = data[0][key];
			}
			setIncome(forIncomes);

			let forExpenses = {};
			for (let key in data[0]) {
				if (key.includes('outgo')) forExpenses[key] = data[0][key];
			}
			setExpenses(forExpenses);
		})();
	}, []);

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
			<section>
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
												defaultValue={income.income1}
												onKeyDown={keyCheckIncome}
											/>
											<InputGroup.Append>
												{income.income1 && (
													<InputGroup.Text>{income.income1} €</InputGroup.Text>
												)}
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
												defaultValue={income.income2}
												onKeyDown={keyCheckIncome}
											/>
											<InputGroup.Append>
												{income.income2 && (
													<InputGroup.Text>{income.income2} €</InputGroup.Text>
												)}
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
										defaultValue={expenses.outgo1}
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
										defaultValue={expenses.outgo2}
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
										defaultValue={expenses.outgo3}
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
										defaultValue={expenses.outgo4}
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
										defaultValue={expenses.outgo5}
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
										defaultValue={expenses.outgo6}
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
										defaultValue={expenses.outgo7}
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
										defaultValue={expenses.outgo8}
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
									userId={props.id}
									theBudget={budget}
								/>
							</Navbar>
						</Col>
					</Row>
				</Container>
			</section>
		</React.Fragment>
	);
}
