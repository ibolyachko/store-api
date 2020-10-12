import dg from 'debug';

// Controllers
import { Orders } from '../../controllers';

const debug = dg('router:orders');

export const get = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const orders = new Orders();
        const data = await orders.getAll();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(req.method, req.originalUrl);
    try {
        const order = new Orders(req.body);
        const data = await order.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
