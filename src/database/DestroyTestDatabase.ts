import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

import { TestDatabaseReseter } from '../services/TestDatabaseReseterService';

if (process.env.NODE_ENV !== 'test') {
	throw new Error('This script should only be run in test environment');
}
const testservice = new TestDatabaseReseter();
await testservice.prepareForTests();
process.exit(0);
