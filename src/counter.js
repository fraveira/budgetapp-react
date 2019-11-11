import React, { useState, useEffect } from 'react';
import axios from './axios';
import { Jumbotron, Button, Col } from 'react-bootstrap';

const Counter = ({ totalIncome, totalOutgo, theIncome, theOutgo, userId }) => {
	const left = totalIncome - totalOutgo;
	console.log('The incomes', theIncome);
	console.log('The outgos', theOutgo);
	console.log("This is what's left", left);
	console.log('This is the user id', userId);

	const submitBudget = () => {
		(async () => {
			const { data } = await axios
				.post(`/api/newbudget/${userId}`, {
					theIncome,
					theOutgo
				})
				.then(({ data }) => {
					console.log('Data success?', data.success);
					if (data.success) {
						location.replace('/app/overview');
					}
				});
		})();
	};

	{
		return (
			<React.Fragment>
				<Jumbotron className="counterJumbo">
					<h1>Counter</h1>
					<p>Here Income {totalIncome || 0} €</p>
					<p>Here Outgo {totalOutgo || 0} €</p>
					<p>Here Left to budget {left || 0} €</p>
					{left == 0 && totalIncome > 0 && <h5>This is a Zero-Based Budget!</h5>}
					{left == 0 &&
					totalIncome > 0 && (
						<Button variant="success" onClick={submitBudget}>
							Submit me!
						</Button>
					)}
					{left < 0 && totalIncome > 0 && <Button variant="danger">You are overspending!</Button>}
				</Jumbotron>
			</React.Fragment>
		);
	}
};

export default Counter;
