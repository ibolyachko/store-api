import dg from 'debug';

// Controllers
import { Customers } from '../../controllers';

const debug = dg('router:customers');

export const get = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const customer = new Customers();
        const data = await customer.getAll();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const customer = new Customers(req.body);
        const data = await customer.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
