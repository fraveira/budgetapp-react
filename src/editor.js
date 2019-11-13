import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Counter from './counter';
import axios from './axios';
import { Button, Navbar } from 'react-bootstrap';

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
							<h2>Edit your budget!!!</h2>
							<h3>INCOME for the month:</h3>
							<h3>Salary 1</h3>
							€{' '}
							<input
								placeholder="Insert Income"
								type="number"
								name="income1"
								defaultValue={income.income1}
								onKeyDown={keyCheckIncome}
							/>
							<p>{income.income1}</p>
							<h3>Salary 2</h3>
							€{' '}
							<input
								placeholder="Insert Income"
								type="number"
								name="income2"
								defaultValue={income.income2}
								onKeyDown={keyCheckIncome}
							/>
							<p>{income.income2}</p>
							<h3>EXPENSES for the month:</h3>
							<h3>Housing</h3>
							€{' '}
							<input
								placeholder="Insert Income"
								type="number"
								name="outgo1"
								defaultValue={expenses.outgo1}
								onKeyDown={keyCheckExpenses}
							/>
							<p>{expenses.outgo1}</p>
							<h3>Food</h3>
							€{' '}
							<input
								placeholder="Insert Income"
								type="number"
								name="outgo2"
								onKeyDown={keyCheckExpenses}
								defaultValue={expenses.outgo2}
							/>
							<p>{expenses.outgo2}</p>
							<h3>Transportation</h3>
							€{' '}
							<input
								placeholder="Insert Income"
								type="number"
								name="outgo3"
								onKeyDown={keyCheckExpenses}
								defaultValue={expenses.outgo3}
							/>
							<p>{expenses.outgo3}</p>
							<h3>Clothes</h3>
							€{' '}
							<input
								placeholder="Insert Income"
								type="number"
								name="outgo4"
								onKeyDown={keyCheckExpenses}
								defaultValue={expenses.outgo4}
							/>
							<p>{expenses.outgo4}</p>
							<h3>Insurance</h3>
							€{' '}
							<input
								placeholder="Insert Income"
								type="number"
								name="outgo5"
								onKeyDown={keyCheckExpenses}
								defaultValue={expenses.outgo5}
							/>
							<p>{expenses.outgo5}</p>
							<h3>Utilities</h3>
							€{' '}
							<input
								placeholder="Insert Income"
								type="number"
								name="outgo6"
								onKeyDown={keyCheckExpenses}
								defaultValue={expenses.outgo6}
							/>
							<p>{expenses.outgo6}</p>
							<h3>Travel</h3>
							€{' '}
							<input
								placeholder="Insert Income"
								type="number"
								name="outgo7"
								onKeyDown={keyCheckExpenses}
								defaultValue={expenses.outgo7}
							/>
							<p>{expenses.outgo7}</p>
							<h3>Health and Beauty</h3>
							€{' '}
							<input
								placeholder="Insert Income"
								type="number"
								name="outgo8"
								onKeyDown={keyCheckExpenses}
								defaultValue={expenses.outgo8}
							/>
							<p>{expenses.outgo8}</p>
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
