// Core
import express from 'express';

// Tools
import { limiter, authenticate, permissions } from '../../helpers';

// Route
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash';

const router = express.Router();

router.get('/', [ limiter(10, 60 * 1000), authenticate, permissions ], get);
router.post('/', [ limiter(10, 60 * 1000) ], post);

router.get('/:hash', [ limiter(10, 60 * 1000), authenticate, permissions ], getByHash);
router.put('/:hash', [ limiter(10, 60 * 1000), authenticate, permissions ], updateByHash);
router.delete('/:hash', [ limiter(10, 60 * 1000), authenticate, permissions ], removeByHash);

export { router as customers };
