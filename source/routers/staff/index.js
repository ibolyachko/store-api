// Core
import express from 'express';

// Tools
import { limiter, authenticate, permissions } from '../../helpers';

// Route
import { get, post } from './route';

const router = express.Router();

router.get('/', [ limiter(10, 60 * 1000), authenticate, permissions ], get);
router.post('/', [ limiter(10, 60 * 1000) ], post);

export { router as staff };
