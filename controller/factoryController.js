//Import factory model
Factory = require('../model/factory');
util = require('./util')

exports.index = function (req, res) {
    Factory.get(function (err, factories) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Factories retrieved succesfully",
            root: factories
        });
    });
};

exports.new = function (req, res) {
    var factory = new Factory();
    factory.name = util.validateName(req.body.name);
    factory.childCount = util.validateChildCount(req.body.childCount);
    factory.randomLowerBound = util.validateBoundWithError(req.body.randomLowerBound);
    factory.randomUpperBound = util.validateBoundWithError(req.body.randomUpperBound);
    util.compareBoundsWithError(factory.randomLowerBound, factory.randomUpperBound);
    factory.children = util.generateChildren(factory.childCount, factory.randomLowerBound, 
                                        factory.randomUpperBound);
    
    factory.save(function (err) {
        if(err)
            res.send(err);
        res.json({
            message: 'New factory created!',
            factory
        });
    });
};

exports.view = function (req, res) {
    Factory.findById(req.params.factory_id, function (err, factory) {
        if (err)
            res.send(err);
        res.json({
            message: 'Factory details loading..',
            factory
        });
    });
};

exports.generate = function (req, res) {
    Factory.findById(req.params.factory_id, function (err, factory ){
        if (err)
            res.send(err);

        factory.children = util.generateChildren(factory.childCount, factory.randomLowerBound, 
                factory.randomUpperBound);

        // save the factory and check for errors
        factory.save(function (err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Factory Children Generated',
                factory
            });
        });
    });
};

exports.update = function (req, res) {
    Factory.findById(req.params.factory_id, function (err, factory ){
        if (err)
            res.send(err);

        factory.name = req.body.name ? req.body.name : factory.name;
        if(util.compareBoundsWithBool(req.body.randomLowerBound, req.body.randomUpperBound)) {
            factory.randomLowerBound = req.body.randomLowerBound;
            factory.randomUpperBound = req.body.randomUpperBound;
        }
        factory.save(function (err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Factory Info updated',
                factory
            });
        });
    });
};

exports.delete = function (req, res) {
    Factory.deleteOne({
        _id: req.params.factory_id
    }, function (err, factory) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Factory deleted'
        });
    });
};



