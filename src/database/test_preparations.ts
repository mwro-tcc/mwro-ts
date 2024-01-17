import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

import { TestDatabaseReseter } from '../services/TestDatabaseReseterService';

const testservice = new TestDatabaseReseter();
await testservice.prepareForTests();
process.exit(0);
