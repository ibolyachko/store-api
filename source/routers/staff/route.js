// Core
import dg from 'debug';

// Controllers
import { Staff } from '../../controllers';

const debug = dg('router:staff');

export const get = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const staff = new Staff();
        const data = await staff.getAll();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const staff = new Staff(req.body);
        const data = await staff.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
