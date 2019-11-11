import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Counter from './counter';
import { Button, Navbar } from 'react-bootstrap';

export default function Creator({ first, last }) {
	const [ income, setIncome ] = useState({});
	const [ outgo1, setOutgo1 ] = useState(0);
	const [ outgo2, setOutgo2 ] = useState(0);
	const [ outgo3, setOutgo3 ] = useState(0);
	const [ outgo4, setOutgo4 ] = useState(0);
	const [ outgo5, setOutgo5 ] = useState(0);
	const [ outgo6, setOutgo6 ] = useState(0);
	const [ outgo7, setOutgo7 ] = useState(0);
	const [ outgo8, setOutgo8 ] = useState(0);
	console.log('Total outgo is', outgo1 + outgo2 + outgo3 + outgo4 + outgo5 + outgo6 + outgo7 + outgo8);
	useEffect(() => {
		console.log('Got here');
	}, []);

	console.log('This is the income', income);

	const keyCheckIncome = (e) => {
		if (e.key === 'Enter') {
			console.log('This is e.target.name', e.target.name);
			setIncome({
				...income,
				[e.target.name]: Number(e.target.value)
			});
		}
	};

	const keyCheck3 = (e) => {
		if (e.key === 'Enter') {
			setOutgo1(Number(e.target.value));
		}
	};

	const keyCheck4 = (e) => {
		if (e.key === 'Enter') {
			setOutgo2(Number(e.target.value));
		}
	};

	const keyCheck5 = (e) => {
		if (e.key === 'Enter') {
			setOutgo3(Number(e.target.value));
		}
	};

	const keyCheck6 = (e) => {
		if (e.key === 'Enter') {
			setOutgo4(Number(e.target.value));
		}
	};

	const keyCheck7 = (e) => {
		if (e.key === 'Enter') {
			setOutgo5(Number(e.target.value));
		}
	};

	const keyCheck8 = (e) => {
		if (e.key === 'Enter') {
			setOutgo6(Number(e.target.value));
		}
	};

	const keyCheck9 = (e) => {
		if (e.key === 'Enter') {
			setOutgo7(Number(e.target.value));
		}
	};

	const keyCheck10 = (e) => {
		if (e.key === 'Enter') {
			setOutgo8(Number(e.target.value));
		}
	};

	return (
		<React.Fragment>
			<Container>
				<Row>
					<Col md={7}>
						<h2>This is your new budget!</h2>
						<h3>INCOME for the month:</h3>
						<h3>Salary 1</h3>
						€{' '}
						<input
							placeholder="Insert Income"
							type="number"
							name="income1"
							defaultValue="0"
							onKeyDown={keyCheckIncome}
						/>
						<p>{income.income1}</p>
						<h3>Salary 2</h3>
						€{' '}
						<input
							placeholder="Insert Income"
							type="number"
							name="income2"
							defaultValue="0"
							onKeyDown={keyCheckIncome}
						/>
						<p>{income.income2}</p>
						<h3>EXPENSES for the month:</h3>
						<h3>Housing</h3>
						€ <input placeholder="Insert Income" type="number" name="housing" onKeyDown={keyCheck3} />
						<h3>Food</h3>
						€ <input placeholder="Insert Income" type="number" onKeyDown={keyCheck4} />
						<h3>Transportation</h3>
						€ <input placeholder="Insert Income" type="number" onKeyDown={keyCheck5} />
						<h3>Clothes</h3>
						€ <input placeholder="Insert Income" type="number" onKeyDown={keyCheck6} />
						<h3>Insurance</h3>
						€ <input placeholder="Insert Income" type="number" onKeyDown={keyCheck7} />
						<h3>Utilities</h3>
						€ <input placeholder="Insert Income" type="number" onKeyDown={keyCheck8} />
						<h3>Travel</h3>
						€ <input placeholder="Insert Income" type="number" onKeyDown={keyCheck9} />
						<h3>Health and Beauty</h3>
						€ <input placeholder="Insert Income" type="number" onKeyDown={keyCheck10} />
					</Col>
					<Col md={5}>
						<Navbar sticky="top" className="stickyCounter">
							<Counter
								totalIncome={income.income1 + income.income2}
								totalOutgo={outgo1 + outgo2 + outgo3 + outgo4 + outgo5 + outgo6 + outgo7 + outgo8}
							/>
						</Navbar>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}
