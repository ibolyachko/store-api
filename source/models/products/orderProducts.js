// Models
import { Products } from './';

// ODM
import { products } from '../../odm';

// Utils
import { NotFoundError } from '../../helpers/errors';

export class OrderProducts extends Products {
    constructor(data) {
        super(data);
    }

    async existsById() {
        const { pid } = this.data;

        const product = await products.exists({ _id: pid });

        if (!product) {
            throw new NotFoundError(`cannot find product with id ${pid}`);
        }
    }

    async withdrawByTotal() {
        const { pid, count } = this.data;

        const product = await products
            .findById(pid)
            .select('total')
            .lean();

        if (product.total === 0) {
            throw new Error('product is not available in stock');
        }

        const total = product.total - Number(count);
        if (total < 0) {
            throw new Error(`cannot be ordered more than ${product.total}`);
        }

        await products
            .findByIdAndUpdate(pid, { total }, { new: true })
            .lean();
    }
}
