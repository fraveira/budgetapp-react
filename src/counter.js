import React, { useState, useEffect } from 'react';
import axios from './axios';
import { Jumbotron, Button, Col } from 'react-bootstrap';

const Counter = ({ totalIncome, totalOutgo }) => {
	const left = totalIncome - totalOutgo;
	console.log("This is what's left", left);

	{
		return (
			<React.Fragment>
				<Jumbotron className="counterJumbo">
					<h1>Counter</h1>
					<p>Here Income {totalIncome}</p>
					<p>Here Outgo {totalOutgo}</p>
					<p>Here Left to budget {left}</p>
					{left == 0 && totalIncome > 0 && <h5>This is a Zero-Based Budget!</h5>}
					{left == 0 && totalIncome > 0 && <Button variant="success">Submit me!</Button>}
				</Jumbotron>
			</React.Fragment>
		);
	}
};
// useEffect(
// 	() => {
// 		console.log('Got here');
// 	},
// 	[ count ]
// );

export default Counter;
