// Core
import express from 'express';

// Tools
import { limiter } from '../../helpers';

// Route
import { login } from './route';

const router = express.Router();

router.post('/login', [ limiter(10, 60 * 1000) ], login);

export { router as auth };
