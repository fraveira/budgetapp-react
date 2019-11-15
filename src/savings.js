import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Button,
	Tabs,
	Tab,
	Modal,
	Card,
	CardDeck,
	ProgressBar,
	Form,
	InputGroup,
	FormControl
} from 'react-bootstrap';
import axios from './axios';
import { Link } from 'react-router-dom';

export default function Savings({ first, id }) {
	const [ savings, setSavings ] = useState([]);
	const [ show, setShow ] = useState(false);
	const [ newname, setSavingsName ] = useState('');
	const [ newgoal, setSavingsGoal ] = useState('');
	const [ newreached, setSavingsReached ] = useState('');

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
		console.log('Information inside the form!', newgoal, newname, newreached);
		axios.post(`/api/newsaving/`, { newgoal, newname, newreached }).then(({ data }) => {
			if (data.success) {
				location.replace('/app/savingfunds');
			}
		});
	};

	return (
		<React.Fragment>
			<Row className="rowto100">
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
							<p>Hey {first}! Are you ready to start saving up for some trip or expensive item?</p>
							<p>
								To create a new saving fund, enter the NAME, savings GOAL, and STARTING amount of your
								fund!
							</p>
							<InputGroup className="mb-3">
								<FormControl
									placeholder="Enter the name of your fund"
									type="text"
									name="newname"
									onChange={(e) => setSavingsName(e.target.value)}
								/>
							</InputGroup>

							<InputGroup className="mb-3">
								<FormControl
									placeholder="Enter the GOAL amount to save"
									type="number"
									name="newgoal"
									onChange={(e) => setSavingsGoal(e.target.value)}
								/>
							</InputGroup>

							<InputGroup className="mb-3">
								<FormControl
									placeholder="Enter the starting amount saved"
									type="number"
									name="newreached"
									onChange={(e) => setSavingsReached(e.target.value)}
								/>
							</InputGroup>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="success" onClick={submitNewSaving}>
								Create Saving Fund
							</Button>
						</Modal.Footer>
					</Modal>
				</Col>
				<Col lg={2} />
			</Row>
			<Col lg={1} />
			<Col lg={10}>
				<Row>
					<CardDeck className="decksSavings">
						{savings.map((saving) => (
							<Card>
								<Card.Img variant="top" />
								<Card.Body>
									<Card.Title>{saving.savingsname}</Card.Title>
									<Card.Text>Your savings goal: {saving.goal} €</Card.Text>
									<Card.Text>You have saved so far {saving.reached} €</Card.Text>
									{saving.reached == saving.goal ? (
										<Button className="incomeBtn" variant="success" block>
											You reached your goal!
										</Button>
									) : (
										<React.Fragment>
											<Form.Control
												placeholder="ENTER to update"
												className="progressBarSaving"
												type="number"
												name={saving.id}
												defaultValue=""
												onKeyDown={keyUpdateSavings}
											/>
											<ProgressBar
												animated
												variant="success"
												className="progressBarSaving"
												now={saving.reached / saving.goal * 100}
												label={`${Math.round(saving.reached / saving.goal * 100)}%`}
											/>
										</React.Fragment>
									)}
								</Card.Body>
							</Card>
						))}
					</CardDeck>
				</Row>
			</Col>
			<Col lg={1} />
		</React.Fragment>
	);
}
