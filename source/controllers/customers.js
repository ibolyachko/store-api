// Models
import { Customers as CustomerModel } from '../models';

export class Customers {
    constructor(data) {
        this.models = {
            customers: new CustomerModel(data),
        };
    }

    async create() {
        const data = await this.models.customers.create();

        return data;
    }

    async getAll() {
        const data = await this.models.customers.getAll();

        return data;
    }

    async getByHash() {
        const data = await this.models.customers.getByHash();

        return data;
    }

    async updateByHash() {
        const data = await this.models.customers.updateByHash();

        return data;
    }

    async removeByHash() {
        const data = await this.models.customers.removeByHash();

        return data;
    }
}
