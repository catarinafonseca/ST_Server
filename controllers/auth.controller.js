const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config/auth.config.js");
const sql = require("../models/db.js");
const User = require('../models/users.model.js');

exports.signup = async (req, res) => {
  try {
    // check duplicate email
    await User.findByEmail(req.body.email, (err, data) => {
      let user = data;
      if (!req.body || !req.body.nome || !req.body.email || !req.body.password || !req.body.foto || !req.body.idCurso || !req.body.data_nasc) {
        res.status(400).json({ message: "Please check if all variables are filled!" });
        return;
      }
      if (user)
        return res
          .status(400)
          .json({ message: "Failed! Email is already in use!" });
      
      user = User.create({
        nome: req.body.nome,
        email: req.body.email,
        idTipo: 1,
        password: bcrypt.hashSync(req.body.password, 8),
        foto: req.body.foto,
        idCurso: req.body.idCurso,
        data_nasc: req.body.data_nasc,
        idNivel: 1,
        pontuacao: 100,
        blocked:false
      });
      return res.json({ message: "User was registered successfully!" });
    });
    /* if (req.body.role) {
            let role = await Role.findOne({ where: { name: req.body.role} });
            if (role)await user.setRole(role);
        } else
            await user.setRole(1); // user role = 1 (regular use; not ADMIN)*/
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    await User.findByEmail(req.body.email, (err, data) => {
      console.log(data);
      let user = data;
      if (user == null) {
        return res.status(404).json({ message: "User Not found." });
      }
      console.log(req.body.password)
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      //const passwordIsValid = req.body.password == user.password ? true : false;
      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      return res.status(200).json({
        id: user.idUtilizador,
        nome: user.nome,
        email: user.email,
        idTipo: user.idTipo,
        token: token,
      });
    });

    // sign the given payload (user ID) into a JWT payload –builds JWT token,using secret key
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};


exports.verifyToken = (req, res, next) => {
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
    req.loggedUserId = decoded.id; // save user ID for future verifications
    next();
  });
};

exports.isAdmin = async (req, res, next) => {
  let user = await User.findById(req.loggedUserId);
  let role = await User.findById(req.idTipo);

  if (role === 3)
    next();
  console.log(role)
  return res.status(403).send({ message: "Require Admin Role!" });
};