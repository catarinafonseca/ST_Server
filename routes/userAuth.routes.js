const express = require('express');
const authController= require("../controllers/auth.controller");
const userController= require("../controllers/users.controller");
let router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdmin, userController.findAll);
    
/* router.route('/:userID')
    .get(authController.verifyToken,  authController.isAdminOrLoggedUser, userController.getUser); */
    
router.all('*', function (req, res) {
    res.status(404).json({ message: 'AUTHENTICATION: what???' });
})

module.exports = router;