// ODM
import { orders } from '../odm';

// Utils
import { NotFoundError } from '../helpers/errors';

export class Orders {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await orders.create(this.data);
        const { hash } = data;

        return { hash };
    }

    async getAll() {
        const data = await orders
            .find({})
            .populate('pid', '-_id -__v -description -total -created -modified -hash')
            .populate('uid', '-_id -__v -__t -emails -created -modified -hash')
            .select('uid pid');

        const result = Array.from(data)
            .map(({ uid, pid }) => {
                return {
                    customer: uid,
                    product:  pid,
                };
            });

        return result;
    }

    async getByHash() {
        const { hash } = this.data;

        const data = await orders
            .findOne({ hash })
            .populate('pid', '-_id -__v -description -total -created -modified -hash')
            .populate('uid', '-_id -__v -__t -emails -created -modified -hash')
            .select('pid uid')
            .lean();

        if (!data) {
            throw new NotFoundError(`can not find data with hash ${hash}`);
        }

        const {
            pid: product,
            uid: customer,
        } = data;

        return {
            product,
            customer,
        };
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        const data = await orders
            .findOneAndUpdate({ hash }, payload, { new: true })
            .populate('uid pid', '-_id -__v -__t -emails -description -total -created -modified -hash')
            .lean();

        if (!data) {
            throw new NotFoundError(`can not find data with hash ${hash}`);
        }

        const {
            pid: product,
            uid: customer,
        } = data;

        return {
            product,
            customer,
        };
    }

    async removeByHash() {
        const { hash } = this.data;

        const data = await orders.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`can not find data with hash ${hash}`);
        }

        return data;
    }
}
