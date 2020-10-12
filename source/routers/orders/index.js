// Core
import express from 'express';

// Tools
import { limiter, authenticate } from '../../helpers';

// Route
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash';

const router = express.Router();

router.get('/', [ limiter(10, 60 * 1000), authenticate ], get);
router.post('/', [ limiter(10, 60 * 1000), authenticate ], post);

router.get('/:hash', [ limiter(10, 60 * 1000), authenticate ], getByHash);
router.put('/:hash', [ limiter(10, 60 * 1000), authenticate ], updateByHash);
router.delete('/:hash', [ limiter(10, 60 * 1000), authenticate ], removeByHash);

export { router as orders };
