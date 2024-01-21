import express from 'express';
import router from './routes';
import { getEnvValues } from './constants/EnvironmentVariables';
import { logger } from './services/logger/logger';

const env = getEnvValues()
const port = env.PORT

const app = express();

app.use(router);

app.listen(port, async () => {
	logger.info(`mwro API listening on port ${port}`);
});

process.on('SIGINT', () => {
	logger.info('Terminating mwro API...');
	process.exit();
});
