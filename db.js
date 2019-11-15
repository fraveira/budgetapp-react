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

// Creating BUDGET in the database.

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

module.exports.getSpecifiedBudget = (id) => {
	return db.query(
		`SELECT budgets.id, incomes.income1, incomes.income2, incomes.income3, outgos.outgo1, outgos.outgo2, outgos.outgo3, outgos.outgo4, outgos.outgo5, outgos.outgo6, outgos.outgo7, outgos.outgo8
    FROM budgets 
    INNER JOIN incomes
    ON ( incomes.inbudget = budgets.id) 
    INNER JOIN outgos
    ON (outgos.inbudget = budgets.id)
    WHERE budgets.id = $1
    ORDER BY id 
    LIMIT 1 `,
		[ id ]
	);
};

// Editing databases. Only chaining one (incomes) and then the other (outgos.)

module.exports.updatingIncomeOnly = (id, income1, income2, income3) => {
	return db.query(
		`
    UPDATE incomes  
    SET income1=$2, income2=$3, income3=$4
    WHERE inbudget=$1
    RETURNING inbudget;`,
		[ id, income1 || null, income2 || null, income3 || null ]
	);
};

module.exports.updatingExpensesOnly = (id, outgo1, outgo2, outgo3, outgo4, outgo5, outgo6, outgo7, outgo8) => {
	return db.query(
		`
    UPDATE outgos  
    SET outgo1=$2, outgo2=$3, outgo3=$4, outgo4=$5, outgo5=$6, outgo6=$7, outgo7=$8, outgo8=$9
    WHERE inbudget=$1
    RETURNING inbudget;`,
		[
			id,
			outgo1 || null,
			outgo2 || null,
			outgo3 || null,
			outgo4 || null,
			outgo5 || null,
			outgo6 || null,
			outgo7 || null,
			outgo8 || null
		]
	);
};

// DELETION ROUTES

module.exports.deleteBudget = (userId, budgetId) => {
	return db.query(
		`DELETE FROM budgets
        WHERE budgets.owner = $1
        AND budgets.id = $2`,
		[ userId, budgetId ]
	);
};

module.exports.deleteIncome = (budgetId) => {
	return db.query(
		`DELETE FROM incomes
        WHERE incomes.inbudget = $1`,
		[ budgetId ]
	);
};

module.exports.deleteExpenses = (budgetId) => {
	return db.query(
		`DELETE FROM outgos
        WHERE outgos.inbudget = $1`,
		[ budgetId ]
	);
};

// SAVINGS ROUTES:

module.exports.getAllSavings = (id) => {
	return db.query(
		`SELECT id, owner, savingsname, reached, goal, created_at FROM savings WHERE owner = $1 LIMIT 4 ORDER BY id`,
		[ id ]
	);
};

module.exports.updateSaving = (id, savingId, reachedAmount) => {
	return db.query(
		`
    UPDATE savings  
    SET reached=$3
    WHERE owner=$1 AND id=$2
    RETURNING reached;`,
		[ id, savingId, reachedAmount ]
	);
};
