const express = require('express');
let router = express.Router();
const submissionController = require('../controllers/submissions.controller');
const authController= require("../controllers/auth.controller");

router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})
router.route('/')
    .get(authController.verifyToken,authController.isAdmin,submissionController.findAll)
    .get(authController.verifyToken,submissionController.findAllByLoggedUser)

router.route('/activities')
    .get(authController.verifyToken,authController.isAdmin,submissionController.findAllActivities)
    .post(authController.verifyToken,submissionController.createActivity)

router.route('/quizzes')
    .get(authController.verifyToken,authController.isAdmin,submissionController.findAllQuizzes)
    .post(authController.verifyToken,submissionController.createQuiz)

router.route('/:submissionID')
    .get(authController.verifyToken,authController.isAdmin,submissionController.findOne)
    .delete(authController.verifyToken,authController.isAdmin,submissionController.delete)
    
//send a predefined error message for invalid routes on activities
router.all('*', function (req, res) {
    res.status(404).json({ message: 'SUBMISSIONS: what???' });
})
// EXPORT ROUTES (required by APP)
module.exports = router;