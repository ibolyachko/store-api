// Models
import {
    Orders as OrderModel,
    OrderProducts as OrderProductModel,
    OrderCustomers as OrderCustomerModel,
} from '../models';

export class Orders {
    constructor(data) {
        this.models = {
            orders:    new OrderModel(data),
            products:  new OrderProductModel(data),
            customers: new OrderCustomerModel(data),
        };
    }

    async create() {
        await this.models.customers
            .existsById();

        await this.models.products
            .existsById();
        await this.models.products
            .withdrawByTotal();

        const data = await this.models.orders.create();

        return data;
    }

    async getAll() {
        const data = await this.models.orders.getAll();

        return data;
    }

    async getByHash() {
        const data = await this.models.orders.getByHash();

        return data;
    }

    async updateByHash() {
        const data = await this.models.orders.updateByHash();

        return data;
    }

    async removeByHash() {
        const data = await this.models.orders.removeByHash();

        return data;
    }
}
