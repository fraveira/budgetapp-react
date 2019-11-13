import React, { useState, useEffect } from 'react';
import axios from './axios';
import { Jumbotron, Button, Col } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';

const Counter = ({ totalIncome, totalOutgo, theIncome, theOutgo, userId, theBudget }) => {
	const left = totalIncome - totalOutgo;

	const data = {
		labels: [
			'Housing',
			'Food',
			'Transportation',
			'Clothes',
			'Insurance',
			'Utilities',
			'Travel',
			'Health & Beauty'
		],
		datasets: [
			{
				data: [
					theOutgo.outgo1,
					theOutgo.outgo2,
					theOutgo.outgo3,
					theOutgo.outgo4,
					theOutgo.outgo5,
					theOutgo.outgo6,
					theOutgo.outgo7,
					theOutgo.outgo8
				],
				backgroundColor: [
					'#ea9926',
					'#cc154b',
					'#08462d',
					'#d0e3d6',
					'#42c917',
					'#a7c524',
					'#1a3349',
					'#e85137'
				],
				hoverBackgroundColor: [
					'#ea9926',
					'#cc154b',
					'#08462d',
					'#d0e3d6',
					'#42c917',
					'#a7c524',
					'#1a3349',
					'#e85137'
				]
			}
		]
	};

	const submitBudget = () => {
		(async () => {
			const { data } = await axios
				.post(`/api/newbudget/${userId}`, {
					theIncome,
					theOutgo,
					theBudget
				})
				.then(({ data }) => {
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
					<Pie data={data} />
					<div>
						<p>Here Income {totalIncome || 0} €</p>
						<p>Here Outgo {totalOutgo || 0} €</p>
						<p>Here Left to budget {left || 0} €</p>
					</div>
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
