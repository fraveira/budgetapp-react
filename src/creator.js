import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Counter from './counter';
import { Button } from 'react-bootstrap';

export default function Creator({ first, last }) {
	const [ income, setIncome ] = useState(0);
	const [ it, setIt ] = useState(0);
	const [ outgo, setOutgo ] = useState('');
	const [ totaler, setTotaler ] = useState('');
	useEffect(() => {
		console.log('Got here');
	}, []);

	const keyCheck = (e) => {
		if (e.key === 'Enter') {
			setIncome(e.target.value);
		}
	};

	return (
		<React.Fragment>
			<Container>
				<Row>
					<Col md={7}>
						<h2>This is your new budget!</h2>
						<h3>INCOME for the month:</h3>
						<h3>Developer Salary</h3>
						€{' '}
						<input
							placeholder="Insert Income"
							type="number"
							onKeyDown={keyCheck}
							onChange={(e) => setIt(e.target.value)}
						/>
						<Button variant="success" size="sm" onClick={() => setIncome(it)}>
							Enter
						</Button>
						<p>{income}</p>
					</Col>
					<Col className="stickyCounter" md={5}>
						<Counter income={income} />
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}
