const express = require('express');
const app = express();
const compression = require('compression');
const db = require('./db');
const cookieSession = require('cookie-session');
const bcrypt = require('./bcrypt');
const csurf = require('csurf');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const server = require('http').Server(app);

app.use(compression());

// Static:

app.use(express.static('./public'));

app.use(express.json());

// Upload storage logic:

const diskStorage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, __dirname + '/uploads');
	},
	filename: function(req, file, callback) {
		uidSafe(24).then(function(uid) {
			callback(null, uid + path.extname(file.originalname));
		});
	}
});

const uploader = multer({
	storage: diskStorage,
	limits: {
		fileSize: 3097152
	}
});

// Middleware

const cookieSessionMiddleware = cookieSession({
	secret: `Cogito ergo sum.`,
	maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

app.use(csurf());

app.use(function(req, res, next) {
	res.cookie('mytoken', req.csrfToken());
	next();
});

app.use(
	express.urlencoded({
		extended: false
	})
);

// End of the middleware.

if (process.env.NODE_ENV != 'production') {
	app.use(
		'/bundle.js',
		require('http-proxy-middleware')({
			target: 'http://localhost:8081/'
		})
	);
} else {
	app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// Welcome route

app.get('/welcome', function(req, res) {
	if (req.session.userId) {
		res.redirect('/');
	} else {
		res.sendFile(__dirname + '/index.html');
	}
});

// Register route.

app.post('/register', (req, res) => {
	let { username, first, last, email, password } = req.body;

	bcrypt.hash(password).then((hash) => {
		db
			.registerUser(username, first, last, email, hash)
			.then(({ rows }) => {
				req.session.userId = rows[0].id;
				res.json({ success: true });
			})
			.catch((err) => {
				console.log('error happened, maybe user typed an existing-email.', err);
			});
	});
});

// Login.

app.post('/login', (req, res) => {
	let email = req.body.email;
	let submittedPass = req.body.password;
	let userPassword;

	db
		.retrievePassword(email)
		.then(({ rows }) => {
			userPassword = rows[0].password;
			return userPassword;
		})
		.then((userPassword) => {
			return bcrypt.compare(submittedPass, userPassword);
		})
		.then((areTheSame) => {
			if (areTheSame) {
				db.loggedIdCheck(email).then((id) => {
					req.session.userId = id.rows[0].id;
					res.json({ success: true });
				});
			} else {
				res.json({ success: false });
			}
		})
		.catch((error) => {
			console.log('This is catching an error happening in comparing passwords', error);
			res.json({ success: false });
		});
});

// User.

app.get('/user', async (req, res) => {
	try {
		const { rows } = await db.getUserById(req.session.userId);
		res.json(rows[0]);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

// Submitting budget route:

app.post('/api/newbudget/:userId', (req, res) => {
	let userId = Number(req.session.userId);
	if (req.body.theBudget) {
		let prevBud = req.body.theBudget;
		let theIncome = req.body.theIncome;
		const colsIncome = [];
		const valsIncome = [];
		let theOutgo = req.body.theOutgo;

		db
			.updatingIncomeOnly(prevBud, theIncome.income1, theIncome.income2, theIncome.income3)
			.then((data) => {
				db
					.updatingExpensesOnly(
						prevBud,
						theOutgo.outgo1,
						theOutgo.outgo2,
						theOutgo.outgo3,
						theOutgo.outgo4,
						theOutgo.outgo5,
						theOutgo.outgo6,
						theOutgo.outgo7,
						theOutgo.outgo8
					)
					.then((data) => {
						res.json({ success: true });
					});
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});

		return prevBud;
	} else {
		db
			.postingBudgetOnly(userId)
			.then(function({ rows }) {
				let budgetId = rows[0].id;
				return budgetId;
			})
			.then((budgetId) => {
				let theIncome = req.body.theIncome;
				const colsIncome = [];
				const valsIncome = [];
				for (var prop in theIncome) {
					colsIncome.push(prop);
					valsIncome.push(theIncome[prop]);
				}

				valsIncome.unshift(budgetId);

				let signs = [];

				valsIncome.forEach((e, i) => {
					signs.push(`$${i + 1}`);
				});

				db.postingIncomeOnly(colsIncome, valsIncome, signs).then((data) => {});

				return budgetId;
			})
			.then((budgetId) => {
				let theOutgo = req.body.theOutgo;
				const colsExpenses = [];
				const valsExpenses = [];

				for (var prop in theOutgo) {
					colsExpenses.push(prop);
					valsExpenses.push(theOutgo[prop]);
				}

				valsExpenses.unshift(budgetId);

				let signs2 = [];

				valsExpenses.forEach((e, i) => {
					signs2.push(`$${i + 1}`);
				});

				db.postingExpensesOnly(colsExpenses, valsExpenses, signs2).then((data) => {
					res.json({ success: true });
				});
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});
	}
});

// Getting budgets info for overview:

app.get('/api/budgets/:userId', async (req, res) => {
	let userId = Number(req.params.userId);
	db
		.getRecentBudgets(userId)
		.then(function({ rows }) {
			res.json(rows);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
});

//  Getting budgets to edit them:

app.get('/api/edit/:budgetId', async (req, res) => {
	let userId = req.session.userId;
	let budgetId = Number(req.params.budgetId);
	db
		.getSpecifiedBudget(budgetId)
		.then(function({ rows }) {
			res.json(rows);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
});

// Delete route:

app.delete('/api/delete/:budgetId', (req, res) => {
	let userId = req.session.userId;
	const budgetor = Number(req.params.budgetId);

	db
		.deleteIncome(budgetor)
		.then(function({ rows }) {})
		.then(() => {
			db.deleteExpenses(budgetor).then((data) => {});
		})
		.then(() => {
			db.deleteBudget(userId, budgetor).then((data) => {
				res.json({ success: true });
			});
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
});

// GETting saving funds ROUTE:

app.get('/api/savings/:userId', async (req, res) => {
	let userId = req.session.userId;
	db
		.getAllSavings(userId)
		.then(function({ rows }) {
			res.json(rows);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
});

// EDITing saving funds.

app.post('/api/updatesaving/:savingId', async (req, res) => {
	let userId = req.session.userId;
	let savingId = req.params.savingId;
	let reachedAmount = Number(req.body.updatedReached);
	db
		.updateSaving(userId, savingId, reachedAmount)
		.then(function({ rows }) {
			res.json({ success: true });
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
});

// POSTing saving funds.

app.post('/api/newsaving/', async (req, res) => {
	let userId = req.session.userId;
	let newgoal = req.body.newgoal;
	let newname = req.body.newname;
	let newreached = req.body.newreached;

	db
		.postSaving(userId, newname, newgoal, newreached)
		.then(function({ rows }) {
			res.json({ success: true });
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
});

// Know if user has a budget or not.

app.get('/api/initialstatus/:userId', async (req, res) => {
	let userId = req.session.userId;

	db
		.getRecentBudgets(userId)
		.then(function({ rows }) {
			if (rows.length !== 0) {
				res.json({ success: true });
			} else {
				res.json({ success: false });
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
});

// Logout route:

app.get('/logout', function(req, res) {
	req.session = null;
	res.redirect('/register');
});

//

app.get('/', (req, res) => {
	if (req.session.userId) {
		res.redirect('/app/overview');
	} else {
		res.redirect('/login');
	}
});

// leave as it is.
app.get('*', function(req, res) {
	if (!req.session.userId) {
		res.redirect('/welcome');
	} else {
		res.sendFile(__dirname + '/index.html');
	}
});
// leave as it is.

app.listen(process.env.PORT || 8080, function() {
	console.log("I'm listening.");
});
