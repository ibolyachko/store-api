// Core
import dg from 'debug';

// Controllers
import { Products } from '../../../controllers';

const debug = dg('router:products:hash');

export const getByHash = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const { hash } = req.params;
        const products = new Products({ hash });
        const data = await products.getByHash();

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
        const products = new Products({ hash, payload });
        const data = await products.updateByHash();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const { hash } = req.params;
        const products = new Products({ hash });
        await products.removeByHash();

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
