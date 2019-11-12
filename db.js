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

module.exports.postingIncomeOnly = (cat, value, signs) => {
	// console.log('Signs and value', signs, value);
	return db.query(
		`
    INSERT INTO incomes (inbudget, ${cat + ''}) 
    values (${signs + ''})
    RETURNING inbudget;`,
		value
	);
};

module.exports.postingExpensesOnly = (id, cat, value) => {
	return db.query(`INSERT INTO outgos (inbudget, ${cat + ''}) values ($1, $2) RETURNING inbudget;`, [ id, value ]);
};

module.exports.getRecentBudgets = (id) => {
	return db.query(`SELECT id, created_at FROM budgets WHERE owner = $1 ORDER BY id DESC LIMIT 3 `, [ id ]);
};

module.exports.gettingIncomeOnly = (budgetId) => {
	return db.query(`SELECT income1, income2, income3 FROM incomes WHERE inbudget = $1`, [ budgetId ]);
};

module.exports.gettingExpensesOnly = (budgetId) => {
	return db.query(
		`SELECT outgo1, outgo2, outgo3, outgo4, outgo5, outgo6, outgo7, outgo8 FROM outgos WHERE inbudget = $1`,
		[ budgetId ]
	);
};
