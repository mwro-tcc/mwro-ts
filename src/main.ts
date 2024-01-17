require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

import express from 'express';
import router from './routes';

const app = express();
const port = process.env.PORT;

app.use(router);

app.listen(port, async () => {
	console.log(`mwro API listening on port ${port}`);
});

process.on('SIGINT', () => {
	console.log('Terminating mwro API...');
	process.exit();
});
