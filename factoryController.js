//Import factory model
Factory = require('./factoryModel');

function generateChildren(number, lowerBound, uppperBound) {
    let children = [];
    for(let i = 0; i < number; i++) {
        children.push(Math.floor(Math.random() * (uppperBound - lowerBound) 
                            + lowerBound));
    }
    return children
}

function validateChildCount(childCount) {
    if(childCount < 0 || childCount > 15) {
        throw "Child Count value must be between 0 and 15!"
    }
    if(!Number.isInteger(childCount)) {
        throw "Child Count value must be Integer!"
    }
    return childCount;
}

function validateName(name) {
    if(name === undefined || name.length === 0) {
        throw "Factory needs a name!"
    }
    return name
}

function validateBounds(lower, upper) {
    if(isNaN(lower) || isNaN(upper)) {
        throw "Bounds must be Number!"
    }
    if(lower > upper) {
        throw "Incorrect Bounds assignment!"
    }
}

//Handle index actions
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
            data: factories
        });
    });
};

// Handle create factory actions
exports.new = function (req, res) {
    var factory = new Factory();
    factory.name = validateName(req.body.name);
    factory.childCount = validateChildCount(req.body.childCount);
    factory.randomLowerBound = req.body.randomLowerBound;
    factory.randomUpperBound = req.body.randomUpperBound;
    validateBounds(factory.randomLowerBound, factory.randomUpperBound);
    factory.children = generateChildren(factory.childCount, factory.randomLowerBound, 
                                        factory.randomUpperBound);
    

    // Save the factory and check for errors
    factory.save(function (err) {
        if(err)
            res.send(err);
        res.json({
            message: 'New factory created!',
            data: factory
        });
    });
};

exports.view = function (req, res) {
    Factory.findById(req.params.factory_id, function (err, factory) {
        if (err)
            res.send(err);
        res.json({
            message: 'Factory details loading..',
            data: factory
        });
    });
};

exports.generate = function (req, res) {
    Factory.findById(req.params.factory_id, function (err, factory ){
        if (err)
            res.send(err);

        factory.children = generateChildren(factory.childCount, factory.randomLowerBound, 
                factory.randomUpperBound);

        // save the factory and check for errors
        factory.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Factory Children Generated',
                data: factory
            });
        });
    });
};

//Handle update factory info
exports.update = function (req, res) {
    Factory.findById(req.params.factory_id, function (err, factory ){
        if (err)
            res.send(err);

        factory.name = req.body.name ? req.body.name : factory.name;
        factory.randomLowerBound = req.body.randomLowerBound ? req.body.randomLowerBound : factory.randomLowerBound;
        factory.randomUpperBound = req.body.randomUpperBound ? req.body.randomUpperBound : factory.randomUpperBound;;
        validateBounds(factory.randomLowerBound, factory.randomUpperBound);
        // save the factory and check for errors
        factory.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Factory Info updated',
                data: factory
            });
        });
    });
};

//Handle delete factory 
exports.delete = function (req, res) {
    Factory.remove({
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



