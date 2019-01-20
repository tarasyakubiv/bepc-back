let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to TreeView crafted with love',
    })
});

// Import Factory controller
var factoryController = require('../controller/factoryController');

//Factory routes
router.route('/factories')
    .get(factoryController.index)
    .post(factoryController.new);

router.route('/factories/:factory_id')
        .get(factoryController.view)
        .patch(factoryController.update)
        .put(factoryController.generate)
        .delete(factoryController.delete);

module.exports = router;