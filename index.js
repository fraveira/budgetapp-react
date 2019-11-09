const express = require('express');
const app = express();
const compression = require('compression');
const db = require('./db');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const bcrypt = require('./bcrypt');

app.use(compression());

/// Static:

app.use(express.static('./public'));

app.use(express.json());

// Middleware

app.use(
	cookieSession({
		secret: 'Cogito ergo sum',
		maxAge: 1000 * 60 * 60 * 24 * 14
	})
);

app.use(
	express.urlencoded({
		extended: false
	})
);

app.use(csurf());

app.use(function(req, res, next) {
	res.cookie('mytoken', req.csrfToken());
	next();
});

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
				console.log('User id is', req.session.userId);
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
					console.log('User id is', req.session.userId);
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
