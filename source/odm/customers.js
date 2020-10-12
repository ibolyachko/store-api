// Core
import mongoose from 'mongoose';

// Discriminator
import { base } from './base';

// Schema
const Schema = mongoose.Schema;

const schema = new Schema({
    city:    String,
    country: String,
});

schema.index({ hash: 1 });
schema.index({ 'name.first': 1, 'name.last': 1 });
schema.index({ city: 1 });
schema.index({ country: 1 });
schema.index({ city: 'text', country: 'text', 'name.first': 'text', 'name.last': 'text' });

const customers = base.discriminator('customers', schema);

customers.createIndexes();


export { customers };
