const express = require('express');
const app = express();
const compression = require('compression');
const db = require('./db');

app.use(compression());

// Static:

app.use(express.static('./public'));

app.use(express.json());

if (process.env.NODE_ENV != 'production') {
	// Make this ready to deploy.
	app.use(
		'/bundle.js',
		require('http-proxy-middleware')({
			target: 'http://localhost:8081/'
		})
	);
} else {
	app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
	console.log("I'm listening.");
});
