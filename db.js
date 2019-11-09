const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || `postgres:postgres:postgres@localhost:5432/budgetsapp`);
// Above to be changed when deployed.

module.exports.registerUser = (username, first, last, email, hash) => {
	return db.query(
		`INSERT INTO users (username, first, last, email, password) values ($1, $2, $3, $4, $5) RETURNING id;`,
		[ username, first, last, email, hash ]
	);
};

module.exports.retrievingPassword = (email) => {
	return db.query(`SELECT password FROM users WHERE email = $1`, [ email ]);
};

module.exports.loggedId = (email) => {
	return db.query(`SELECT id FROM users WHERE email = $1`, [ email ]);
};
