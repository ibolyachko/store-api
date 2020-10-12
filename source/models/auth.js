// Core
import bcrypt from 'bcrypt';

// ODM
import { base as users } from '../odm';

export class Auth {
    constructor(data) {
        this.data = data;
    }

    async login() {
        const { email, password } = this._credentials(this.data);

        const user = await users
            .findOne({ 'emails.email': email })
            .select('password role hash')
            .lean();

        if (!user) {
            throw new Error('credentials are not valid');
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new Error('credentials are not valid');
        }

        const { role, hash } = user;

        return  { role, hash };
    }

    _credentials(data) {
        const [ , auth ] = data.split(' ');
        const [ email, password ] = Buffer.from(auth, 'base64')
            .toString()
            .split(':');

        return { email, password };
    }
}
