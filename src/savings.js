import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Modal, Card, CardDeck, ProgressBar, Form } from 'react-bootstrap';
import axios from './axios';
import { Link } from 'react-router-dom';

export default function Savings({ first, id }) {
	const [ savings, setSavings ] = useState([]);
	const [ show, setShow ] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(
		() => {
			if (!id) {
				return;
			}
			(async () => {
				const { data } = await axios.get(`/api/savings/${id}`);
				setSavings(data);
				console.log('These are my savings!', data);
			})();
		},
		[ id ]
	);

	const keyUpdateSavings = (e) => {
		if (e.key === 'Enter' || e.key === 'Tab') {
			const rightSavingId = savings.find(({ id }) => id == e.target.name);
			const updatedReached = Number(rightSavingId.reached) + Number(e.target.value);
			axios.post(`/api/updatesaving/${rightSavingId.id}`, { updatedReached }).then(({ data }) => {
				if (data.success) {
					location.replace('/app/savingfunds');
				}
			});
		}
	};

	const submitNewSaving = (e) => {
		if (e.key === 'Enter' || e.key === 'Tab') {
			const rightSavingId = savings.find(({ id }) => id == e.target.name);
			const updatedReached = Number(rightSavingId.reached) + Number(e.target.value);
			axios.post(`/api/updatesaving/${rightSavingId.id}`, { updatedReached }).then(({ data }) => {
				if (data.success) {
					location.replace('/app/savingfunds');
				}
			});
		}
	};

	return (
		<React.Fragment>
			<Row>
				<Col lg={2} />
				<Col lg={8}>
					<Button variant="success" size="lg" className="betterThanIDeseve" block onClick={handleShow}>
						Create a new Saving Fund
					</Button>

					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Create a new Saving Fund!</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<p>Ready to start saving up for some trip or expensive item?</p>
							<p>Give a name to the fund. </p>
							<p>Enter your savings goal</p>
							<p>Enter your starting saved amount!</p>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={handleClose}>
								Save Changes
							</Button>
						</Modal.Footer>
					</Modal>
				</Col>
				<Col lg={2} />
			</Row>
			<Col lg={2} />
			<Col lg={8}>
				<Row>
					<CardDeck>
						{savings.map((saving) => (
							<Card>
								<Card.Img variant="top" />
								<Card.Body>
									<Card.Title>{saving.savingsname}</Card.Title>
									<Card.Text>Your savings goal: {saving.goal} €</Card.Text>
									<Card.Text>You have saved so far {saving.reached} €</Card.Text>
									<Form.Control
										placeholder="ENTER to update"
										className="progressBarSaving"
										type="number"
										name={saving.id}
										defaultValue=""
										onKeyDown={keyUpdateSavings}
									/>

									<ProgressBar
										className="progressBarSaving"
										now={saving.reached / saving.goal * 100}
										label={`${Math.round(saving.reached / saving.goal * 100)}%`}
									/>
								</Card.Body>
							</Card>
						))}
					</CardDeck>
				</Row>
			</Col>
			<Col lg={2} />
		</React.Fragment>
	);
}
