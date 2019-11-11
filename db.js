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
	console.log('This is the cat', cat);
	if (cat == 'income1') {
		return db.query(`INSERT INTO incomes (inbudget, income1) values ($1, $2) RETURNING id;`, [ id, value ]);
	} else if (cat == 'income2') {
		return db.query(`INSERT INTO incomes (inbudget, income2) values ($1, $2) RETURNING id;`, [ id, value ]);
	} else if (cat == 'income3') {
		return db.query(`INSERT INTO incomes (inbudget, income3) values ($1, $2) RETURNING id;`, [ id, value ]);
	}
};
