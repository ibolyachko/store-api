// Core
import mongoose from 'mongoose';

// Schema
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref:  'customers',
    },
    pid: {
        type: Schema.Types.ObjectId,
        ref:  'products',
    },
    count: {
        type:     Number,
        min:      1,
        required: true,
    },
    comment: String,
},
{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
    hash: true,
});

export const orders = mongoose.model('orders', schema);
