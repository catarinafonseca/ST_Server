const User = require('../models/users.model.js');

exports.findAll = (req, res) => {
    User.getAll(req.query,(err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        else
            res.status(200).json(data);
    });
};
exports.findOne = (req, res) => {
    User.findById(req.params.userID, (err, data) => {
        if (err) {
            if (err.kind === 'not found')
                res.status(404).json({
                    message: `Not found User with id ${req.params.userID}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving User with id ${req.params.userID}.`
                });
        } else
            res.status(200).json(data);
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body || !req.body.nome || !req.body.email || !req.body.idTipo || !req.body.password || !req.body.foto || !req.body.idCurso || !req.body.data_nasc || !req.body.idNivel) {
        res.status(400).json({ message: "Please check if all variables are filled!" });
        return;
    }

    const user = {
        nome: req.body.nome,
            email: req.body.email,
            idTipo: 1,
            password: req.body.password, // generates hash to password
            foto: req.body.foto,
            idCurso: req.body.idCurso,
            data_nasc: req.body.data_nasc,
            idNivel: req.body.idNivel,
            pontuacao:100
    };

    User.create(user, (err, data) => {
        if (err)
            res.status(500).json({
                message: err.message || "Some error occurred while creating this user."
            });
        else {
            res.status(201).json({ message: "New user created.", location: "/users/" + data.insertId });
        }
    });
};
exports.delete = (req, res) => {
    User.remove(req.params.userID, (err, data) => { 
        if (err) {
            if (err.kind === 'not found')
                res.status(404).json({
                    message: `Not found user with id ${req.params.userID}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving user with id ${req.params.userID}.`
                });
        } else
            res.status(200).json({
                message: `Deleted with sucess user with id ${req.params.userID}.`
            });
    }); 
};
exports.update = (req, res) => {
    // Validate request
    if (!req.body || !req.body.nome || !req.body.email || !req.body.idCurso || !req.body.data_nasc) {
        res.status(400).json({ message: "Please check if all variables are filled!" });
        return;
    }

    const user = {
        nome: req.body.nome,
        email: req.body.email,
        idCurso: req.body.idCurso,
        data_nasc: req.body.data_nasc,
    };

    User.updateById(req.params.userID, user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found user with id ${req.params.userID}.`
                });
            } else {
                res.status(500).json({
                    message: "Error updating user with id " + req.params.userID,
                    
                });
            }
        } else 
            res.status(200).json({ message: "Updated user.", location: `/users/${req.params.userID}` });
    });
};
