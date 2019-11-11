const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || `postgres:postgres:postgres@localhost:5432/budgetsapp`);
// Above to be changed when deployed.

module.exports.registerUser = (username, first, last, email, hash) => {
	return db.query(
		`INSERT INTO users (username, first, last, email, password) values ($1, $2, $3, $4, $5) RETURNING id;`,
		[ username, first, last, email, hash ]
	);
};

module.exports.retrievePassword = (email) => {
	return db.query(`SELECT password FROM users WHERE email = $1`, [ email ]);
};

module.exports.loggedIdCheck = (email) => {
	return db.query(`SELECT id FROM users WHERE email = $1`, [ email ]);
};

module.exports.getUserById = (id) => {
	return db.query(`SELECT id, username, first, last FROM users WHERE id = $1`, [ id ]);
};

module.exports.postingBudgetOnly = (id) => {
	return db.query(`INSERT INTO budgets (owner) values ($1) RETURNING id;`, [ id ]);
};

module.exports.postingIncomeOnly = (id, cat, value) => {
	console.log('This is the income', cat);
	if (cat == 'income1') {
		return db.query(`INSERT INTO incomes (inbudget, income1) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
	} else if (cat == 'income2') {
		return db.query(`INSERT INTO incomes (inbudget, income2) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
	} else if (cat == 'income3') {
		return db.query(`INSERT INTO incomes (inbudget, income3) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
	}
};

module.exports.postingExpensesOnly = (id, cat, value) => {
	console.log('This is the cat for expenses', cat);
	if (cat == 'outgo1') {
		return db.query(`INSERT INTO outgos (inbudget, outgo1) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
	} else if (cat == 'outgo2') {
		return db.query(`INSERT INTO outgos (inbudget, outgo2) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
	} else if (cat == 'outgo3') {
		return db.query(`INSERT INTO outgos (inbudget, outgo3) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
	} else if (cat == 'outgo4') {
		return db.query(`INSERT INTO outgos (inbudget, outgo4) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
	} else if (cat == 'outgo5') {
		return db.query(`INSERT INTO outgos (inbudget, outgo5) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
	} else if (cat == 'outgo6') {
		return db.query(`INSERT INTO outgos (inbudget, outgo6) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
	} else if (cat == 'outgo7') {
		return db.query(`INSERT INTO outgos (inbudget, outgo7) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
	} else if (cat == 'outgo8') {
		return db.query(`INSERT INTO outgos (inbudget, outgo8) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
	}
};
