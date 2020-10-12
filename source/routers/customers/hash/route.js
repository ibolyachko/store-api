// Core
import dg from 'debug';

// Controllers
import { Customers } from '../../../controllers';

const debug = dg('router:customers:hash');

export const getByHash = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const { hash } = req.params;
        const customer = new Customers({ hash });
        const data = await customer.getByHash();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateByHash = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const { hash } = req.params;
        const payload = req.body;
        const customer = new Customers({ hash, payload });
        const data = await customer.updateByHash();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const { hash } = req.params;
        const customer = new Customers({ hash });
        await customer.removeByHash();

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
