// Core
import dg from 'debug';

// Controllers
import { Orders } from '../../../controllers';

const debug = dg('router:orders:hash');

export const getByHash = async (req, res) => {
    debug(req.method, req.originalUrl);
    try {
        const { hash } = req.params;
        const order = new Orders({ hash });
        const data = await order.getByHash();

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
        const order = new Orders({ hash, payload });
        const data = await order.updateByHash();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const { hash } = req.params;
        const order = new Orders({ hash });
        await order.removeByHash();

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
