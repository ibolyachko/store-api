// Core
import mongoose from 'mongoose';

// Schema
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    email: {
        type:     String,
        unique:   true,
        required: true,
    },
    primary: Boolean,
}, {
    _id: false,
});

const phoneSchema = new Schema({
    phone:   String,
    primary: Boolean,
}, {
    _id: false,
});

const schema = new Schema({
    name: {
        first: {
            type:     String,
            required: true,
        },
        last: {
            type:     String,
            required: true,
        },
    },
    emails:   [ emailSchema ],
    phones:   [ phoneSchema ],
    password: {
        type:   String,
        select: false,
    },
},
{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
    hash: true,
});

export const base = mongoose.model('users', schema);
