const mongoose = require('mongoose');
const logger = require('morgan');

mongoose.set('strictQuery', true);

const dbOptions = {
	autoIndex: false,
	autoCreate: true
}

const connectDb = async () => {
	await mongoose.connect(process.env.DB_HOST, dbOptions);
}

const closeDb = () => {
	console.log("in the db close connection")
	_db.close();	
}

module.exports = {
	connectDb,
	closeDb
}

const _db = mongoose.connection;

// process.on('SIGINT', closeDb);
// process.on('SIGTERM', closeDb);
// process.on('SIGKILL', closeDb);

_db.on('connected', () => {
	console.log('mongoose:connected - connected to MongoDB successfully. -- ', new Date);
});

_db.on('disconnected', () => {
	console.log('mongoose:disconnected - disconnected from MongoDB successfully.');
});

_db.on('error', (error) => {
		console.log('mongoose:error - could not connect to MongoDB due to an error: ', error);
	_db.close()
		.then(() => {
			createReconnectTimer();
		})
		.catch((connectionError) => {
			console.log('mongoose:error - could not close MongoDB connection due to an error ', connectionError);
		});
});