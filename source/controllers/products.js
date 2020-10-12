// Models
import { Products as ProductModel } from '../models';

export class Products {
    constructor(data) {
        this.models = {
            products: new ProductModel(data),
        };
    }

    async create() {
        const data = await this.models.products.create();

        return data;
    }

    async getAll() {
        const data = await this.models.products.getAll();

        return data;
    }

    async getByHash() {
        const data = await this.models.products.getByHash();

        return data;
    }

    async updateByHash() {
        const data = await this.models.products.updateByHash();

        return data;
    }

    async removeByHash() {
        const data = await this.models.products.removeByHash();

        return data;
    }
}
