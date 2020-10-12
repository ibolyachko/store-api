// Core
import mongoose from 'mongoose';
import dg from 'debug';

// Instruments
import { getDbName, getDbUrl, getDbPort, getDbCredentials } from '../helpers';

// Plugins
import { addHash } from './plugins';

mongoose.plugin(addHash);

const debug = dg('db');
const DB_NAME = getDbName();
const DB_URL = getDbUrl();
const DB_PORT = getDbPort();
const { DB_USER, DB_PASSWORD } = getDbCredentials();

const mongooseOptions = {
    promiseLibrary:     global.Promise,
    poolSize:           10,
    keepAlive:          30000,
    connectTimeoutMS:   5000,
    reconnectTries:     Number.MAX_SAFE_INTEGER,
    reconnectInterval:  5000,
    useNewUrlParser:    true,
    useFindAndModify:   false,
    useCreateIndex:     true,
    useUnifiedTopology: true,
};

const connection = mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`, mongooseOptions);

connection
    .then(() => {
        debug(`DB '${DB_NAME}' connected`);
    })
    .catch(({ message }) => {
        debug(`DB ${DB_NAME} connectionError: ${message}`);
    });
