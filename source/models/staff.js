// Core
import bcrypt from 'bcrypt';

// ODM
import { staff } from '../odm';

export class Staff {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const user = await this._transformCreate(this.data);
        const data = await staff.create(user);
        const { hash } = data;

        return { hash };
    }

    async getAll() {
        const data = await staff
            .find({})
            .select('-_id -__v -__t -hash -disabled -created -modified')
            .lean();

        return data;
    }

    async _transformCreate(data) {
        const {
            name,
            email,
            phone,
            role,
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
            role,
            emails: [{ email, primary: true }],
            phones: [{ phone, primary: true }],
        };
    }
}
