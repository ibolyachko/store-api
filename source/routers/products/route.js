import dg from 'debug';

// Controllers
import { Products } from '../../controllers';

const debug = dg('router:products');

export const get = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const products = new Products();
        const data = await products.getAll();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(req.method, req.originalUrl);

    try {
        const product = new Products(req.body);
        const data = await product.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
