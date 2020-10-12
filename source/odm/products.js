// Core
import mongoose from 'mongoose';

// Schema
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type:     String,
        required: true,
    },
    description: String,
    price:       {
        type:     Number,
        min:      0,
        required: true,
    },
    discount: {
        type: Number,
        min:  0,
        max:  50,
    },
    total: {
        type:     Number,
        min:      0,
        required: true,
    },
},
{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
    hash: true,
});

schema.index({ hash: 1 });

const products = mongoose.model('products', schema);

products.createIndexes();

export { products };
