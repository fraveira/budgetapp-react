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
	return db.query(
		`
    INSERT INTO incomes (inbudget, ${cat + ''}) 
    values (${signs + ''})
    RETURNING inbudget;`,
		value
	);
};

module.exports.postingExpensesOnly = (cat, value, signs2) => {
	return db.query(
		`
    INSERT INTO outgos (inbudget, ${cat + ''}) 
    values (${signs2 + ''})
    RETURNING inbudget;`,
		value
	);
};

module.exports.getRecentBudgets = (id) => {
	return db.query(
		`SELECT budgets.id, incomes.income1, incomes.income2, incomes.income3, outgos.outgo1, outgos.outgo2, outgos.outgo3, outgos.outgo4, outgos.outgo5, outgos.outgo6, outgos.outgo7, outgos.outgo8
    FROM budgets 
    INNER JOIN incomes
    ON ( incomes.inbudget = budgets.id) 
    INNER JOIN outgos
    ON (outgos.inbudget = budgets.id)
    WHERE budgets.owner = $1
    ORDER BY id 
    DESC LIMIT 3 `,
		[ id ]
	);
};

// module.exports.gettingIncomeOnly = (budgetId) => {
// 	return db.query(`SELECT * FROM incomes WHERE inbudget = $1`, [ budgetId ]);
// };

// module.exports.gettingExpensesOnly = (budgetId) => {
// 	return db.query(`SELECT * FROM outgos WHERE inbudget = $1`, [ budgetId ]);
// };
