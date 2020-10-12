// ODM
import { products } from '../../odm';

// Utils
import { NotFoundError } from '../../helpers/errors';

export class Products {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await products.create(this.data);
        const { hash } = data;

        return { hash };
    }

    async getAll() {
        const data = await products
            .find({})
            .select('-_id title description price discount')
            .lean();

        return data;
    }

    async getByHash() {
        const { hash } = this.data;

        const data = await products
            .findOne({ hash })
            .select('-_id title description price discount')
            .lean();

        if (!data) {
            throw new NotFoundError(`can not find data with hash ${hash}`);
        }

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        const data = await products
            .findOneAndUpdate({ hash }, payload, { new: true })
            .select('-_id title description price discount')
            .lean();

        if (!data) {
            throw new NotFoundError(`can not find data with hash ${hash}`);
        }

        return data;
    }

    async removeByHash() {
        const { hash } = this.data;

        const data = await products.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`can not find data with hash ${hash}`);
        }

        return data;
    }
}
