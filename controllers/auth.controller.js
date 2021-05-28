const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");

const config = require("../config/auth.config.js");
const sql = require("../models/db.js"); 
const User = require('../models/users.model.js');

exports.signup = (req, res) => {
    try {// check duplicate username 
        let user /* = User.findOne(
            { where: { email: req.body.email} }
        ); */

        if (user)
            return res.status(400).json({ message: "Failed! Email is already in use!" });
            
            // save User to database
        user = User.create({
            nome: req.body.nome,
            email: req.body.email,
            idTipo: 1,
            password: bcrypt.hashSync(req.body.password, 8), // generates hash to password
            foto: req.body.foto,
            idCurso: req.body.idCurso,
            data_nasc: req.body.data_nasc,
            idNivel: req.body.idNivel,
            pontuacao:100,
        });
        /* if (req.body.role) {
            let role = await Role.findOne({ where: { name: req.body.role} });
            if (role)await user.setRole(role);
        } else
            await user.setRole(1); // user role = 1 (regular use; not ADMIN)*/
        return res.json({ message: "User was registered successfully!" }); 
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    };
};

exports.signin= async (req, res) => {
    try {
        let user = User.findByEmail({ where: { email: req.body.email} });
        console.log(user);
        if (!user) 
            return res.status(404).json({ message: "User Not found." });
        // tests a string (password in body) against a hash (password in database)
        const passwordIsValid= bcrypt.compareSync( 
            req.body.password, user.password
        );
        
        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null, message: "Invalid Password!"
            });
        }
        // sign the given payload (user ID) into a JWT payload –builds JWT token,using secret key
        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // 24 hours
        });
        
        
        return res.status(200).json({
            id: user.id, 
            nome: user.nome,
            email: user.email,
            
        });
    } 
    catch (err) { res.status(500).json({ message: err.message}); console.log(err);};
};

exports.verifyToken= (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }// verify request token given the JWT secret key
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.loggedUserId= decoded.id; // save user ID for future verifications
        next();
    });
};