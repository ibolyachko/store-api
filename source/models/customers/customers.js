// Core
import bcrypt from 'bcrypt';

// ODM
import { customers } from '../../odm';

// Utils
import { NotFoundError } from '../../helpers/errors';

export class Customers {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const user = await this._transformCreate(this.data);
        const data = await customers.create(user);

        const { hash } = data;

        return { hash };
    }

    async getAll() {
        const data = await customers
            .find({})
            .select('-_id -__v -__t -hash -disabled -created -modified')
            .lean();

        return data;
    }

    async getByHash() {
        const { hash } = this.data;

        const data = await customers
            .findOne({ hash })
            .select('-_id -__v -__t -hash -disabled -created -modified')
            .lean();

        if (!data) {
            throw new NotFoundError(`can not find data with hash ${hash}`);
        }

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        const {  name, emails, phones, city, country } = payload;

        const data = await customers
            .findOneAndUpdate({ hash }, {
                name,
                city,
                country,
                $addToSet: {
                    emails,
                    phones,
                },
            }, {
                new: true,
            })
            .select('-_id -__v -__t -hash -disabled -created -modified')
            .lean();

        if (!data) {
            throw new NotFoundError(`can not find data with hash ${hash}`);
        }

        return data;
    }

    async removeByHash() {
        const { hash } = this.data;

        const data = await customers.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`can not find data with hash ${hash}`);
        }

        return data;
    }

    async _transformCreate(data) {
        const {
            name,
            email,
            phone,
            password: plainPassword,
        } = data;

        const [ first, last ] = name.split(' ');
        const password = await bcrypt.hash(plainPassword, 10);

        return {
            name: {
                first,
                last,
            },
            password,
            emails: [{ email, primary: true }],
            phones: [{ phone, primary: true }],
        };
    }
}
