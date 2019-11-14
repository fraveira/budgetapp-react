import React, { useState, useEffect } from 'react';
import axios from './axios';
import { Jumbotron, Button, Col, ToggleButton } from 'react-bootstrap';
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
					<div>
						<Pie data={data} width={100} height={250} options={{ maintainAspectRatio: false }} />
					</div>
					<div>
						{totalIncome > 0 && (
							<Button className="incomeBtn" variant="primary" active block>
								Total Income {totalIncome || 0} €
							</Button>
						)}

						{totalIncome == 0 && (
							<Button className="incomeBtn" variant="primary" active block>
								Add your Income!
							</Button>
						)}

						{left !== 0 && (
							<Button className="incomeBtn" variant="danger" active block>
								Left to budget {left || 0} €
							</Button>
						)}
					</div>
					{left == 0 && totalIncome > 0 && <h5 className="centerh5s">This is a Zero-Based Budget!</h5>}
					{left == 0 &&
					totalIncome > 0 && (
						<Button variant="success" onClick={submitBudget} block>
							Submit me!
						</Button>
					)}
					{left < 0 &&
					totalIncome > 0 && (
						<Button className="incomeBtn" variant="warning" block>
							You are overspending!
						</Button>
					)}
				</Jumbotron>
			</React.Fragment>
		);
	}
};

export default Counter;
