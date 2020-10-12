// Core
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dg from 'debug';

// Instruments
import {
    getPassword,
    NotFoundError,
    devLogger,
    errorLogger,
    notFoundLogger,
    validationLogger,
} from './helpers';

// Initialize DB connection
import './db';

// Routers
import * as routers from './routers';

const app = express();
const debug = dg('server:init');
const MongoStore = connectMongo(session);

const sessionOptions = {
    key:               'user',
    secret:            getPassword(),
    resave:            false,
    rolling:           true,
    saveUninitialized: false,
    store:             new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie:            {
        httpOnly: true,
        maxAge:   15 * 60 * 1000,
    },
};

// change cookie max age for development
if (process.env.NODE_ENV === 'development') {
    sessionOptions.cookie.maxAge = 8 * 60 * 60 * 1000; // 8 hours
}

// secure cookie for production
if (process.env.NODE_ENV === 'production') {
    sessionOptions.cookie.secure = true;
}
app.use(helmet());
app.use(
    bodyParser.json({
        limit: '5kb',
    }),
);
app.use(session(sessionOptions));

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        const body
            = req.method === 'GET'
                ? 'Body not supported for GET'
                : JSON.stringify(req.body, null, 2);

        devLogger.debug(`${req.method} ${body ? `\n${body}` : ''}`);
        next();
    });
}

// Routers
app.use('/auth', routers.auth);
app.use('/staff', routers.staff);
app.use('/customers', routers.customers);
app.use('/products', routers.products);
app.use('/orders', routers.orders);

app.use('*', (req, res, next) => {
    const error = new NotFoundError(
        `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
        404,
    );
    next(error);
});

if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-unused-vars
    app.use((error, req, res, next) => {
        const { name, message, statusCode } = error;
        const errorMessage = `${name}: ${message}`;

        switch (error.name) {
            case 'NotFoundError':
                notFoundLogger.error(errorMessage);
                break;

            case 'ValidationError':
                validationLogger.error(errorMessage);
                break;

            default:
                errorLogger.error(errorMessage);
                break;
        }

        debug(`Error: ${errorMessage}`);

        const status = statusCode ? statusCode : 500;
        res.status(status).json({ message: message });
    });
}

export { app };
