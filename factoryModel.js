var mongoose = require('mongoose');

//Setup schema
var factorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    childCount: {
        type: Number,
        required: true
    },
    randomLowerBound: {
        type: Number,
        required: true
    },
    randomUpperBound: {
        type: Number,
        required: true
    },
    children: {
        type: Array,
        required: true
    }
});

var Factory = module.exports = mongoose.model('factory', factorySchema);

module.exports.get = function (callback, limit) {
    Factory.find(callback).limit(limit);
}