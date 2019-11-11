import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Counter from './counter';
import { Button } from 'react-bootstrap';

export default function Creator({ first, last }) {
	const [ income1, setIncome1 ] = useState(0);
	console.log('Income1', income1);
	const [ income2, setIncome2 ] = useState(0);
	console.log('Income2', income2);
	const [ totalIncome, setTotalIncome ] = useState('');

	useEffect(() => {
		console.log('Got here');
	}, []);

	const keyCheck1 = (e) => {
		if (e.key === 'Enter') {
			setIncome1(Number(e.target.value));
		}
	};

	const keyCheck2 = (e) => {
		if (e.key === 'Enter') {
			setIncome2(Number(e.target.value));
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
						€ <input placeholder="Insert Income" type="number" onKeyDown={keyCheck1} />
						<p>{income1}</p>
						<h3>Salary 2</h3>
						€ <input placeholder="Insert Income" type="number" onKeyDown={keyCheck2} />
						<p>{income2}</p>
					</Col>
					<Col className="stickyCounter" md={5}>
						<Counter totalIncome={income1 + income2} />
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}
