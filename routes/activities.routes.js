const express = require('express');
let router = express.Router();
const activityController = require('../controllers/activities.controller');

router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})
router.route('/')
    .get(activityController.findAll)
    .post(activityController.create)

router.route('/:activityID')
    .get(activityController.findOne)
    .delete(activityController.delete)
    .put(activityController.update);
    
/* router.route('/activities?type={tipo}')
    .get(activityController.findFilters) */
//router.route('/activities?type={tipo}&local={local}&text={searchText}')

//send a predefined error message for invalid routes on activities
router.all('*', function (req, res) {
    res.status(404).json({ message: 'ACTIVITIES: what???' });
})
// EXPORT ROUTES (required by APP)
module.exports = router;