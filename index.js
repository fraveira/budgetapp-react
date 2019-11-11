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
					console.log('LOGGED IN: User id is', req.session.userId);
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
		console.log('Rows are these', rows[0]);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

// Submitting budget route:

app.post('/api/newbudget/:userId', (req, res) => {
	let userId = Number(req.params.userId);

	console.log('This is in post new budget thingy', req.body.theIncome);
	console.log('This is in post new budget thingy', req.body.theOutgo);
	console.log("This is the userId that's posting", userId);

	db
		.postingBudgetOnly(userId)
		.then(function({ rows }) {
			console.log('Rows after posting new budget', rows[0].id);
			let budgetId = rows[0].id;
			return budgetId;
		})
		.then((budgetId) => {
			console.log('New COSA AQUÍ', req.body.theIncome);
			let theIncome = req.body.theIncome;
			for (const property in theIncome) {
				console.log('The loop!', budgetId, `${property}`, `${theIncome[property]}`);
				db.postingIncomeOnly(budgetId, `${property}`, `${theIncome[property]}`);
			}
			return budgetId;
		})
		.then((budgetId) => {
			console.log('New COSA AQUÍ', req.body.theOutgo);
			let theOutgo = req.body.theOutgo;
			for (const property in theOutgo) {
				console.log('The loop!', budgetId, `${property}`, `${theOutgo[property]}`);
				db.postingExpensesOnly(budgetId, `${property}`, `${theOutgo[property]}`);
			}
			res.json({ success: true });
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	// 	.then((areTheSame) => {
	// 		if (areTheSame) {
	// 			db.loggedIdCheck(email).then((id) => {
	// 				req.session.userId = id.rows[0].id;
	// 				console.log('LOGGED IN: User id is', req.session.userId);
	// 				res.json({ success: true });
	// 			});
	// 		} else {
	// 			res.json({ success: false });
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.log('This is catching an error happening in comparing passwords', error);
	// 		res.json({ success: false });
	// 	});
});

// Logout route:

app.get('/logout', function(req, res) {
	req.session = null;
	res.redirect('/register');
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

app.listen(8080, function() {
	console.log("I'm listening.");
});
