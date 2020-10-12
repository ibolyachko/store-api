import uuid from 'uuid/v4';

export const addHash = (schema, options) => {
    if (!schema.options.hash) {
        return false;
    }

    schema.add({
        hash: {
            type: String,
        },
    });

    schema.pre('save', function(next) {
        this.hash = uuid();
        next();
    });

    if (options && options.index) {
        schema.path('hash').index(true);
    }
};

