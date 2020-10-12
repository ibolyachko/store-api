// Models
import { Customers } from './';

// ODM
import { customers } from '../../odm';

// Utils
import { NotFoundError } from '../../helpers/errors';

export class OrderCustomers extends Customers {
    constructor(data) {
        super(data);
    }

    async existsById() {
        const { uid } = this.data;

        const customer = await customers.exists({ _id: uid });

        if (!customer) {
            throw new NotFoundError(`cannot find customer with id ${uid}`);
        }
    }
}
