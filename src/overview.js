import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Overview({ first }) {
	return (
		<React.Fragment>
			<Container>
				<Row>
					<Col />
					<Col xs={6} className="creatorBtn">
						<Link className="noUnderline" to="/app/create">
							<Button variant="success" size="lg" block>
								Create your first budget, {first}!
							</Button>
						</Link>
					</Col>
					<Col />
				</Row>
			</Container>
		</React.Fragment>
	);
}
