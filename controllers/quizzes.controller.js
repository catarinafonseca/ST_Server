const Quiz = require('../models/quizzes.model.js');

exports.findAll = (req, res) => {
    Quiz.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Quizzes."
            });
        else
            res.status(200).json(data);
    });
};
exports.findOne = (req, res) => {
    Quiz.findById(req.params.quizID, (err, data) => {
        if (err) {
            if (err.kind === 'not found')
                res.status(404).json({
                    message: `Not found Quiz with id ${req.params.quizID}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving Quiz with id ${req.params.quizID}.`
                });
        } else
            res.status(200).json(data);
    });
};
exports.create = (req, res) => {
    // Validate request
    if (!req.body || !req.body.tema || !req.body.desc_quiz || !req.body.pergunta || !req.body.resposta1 
        || !req.body.resposta2 || !req.body.resposta3 || !req.body.resposta4 || !req.body.resposta_certa) {
        res.status(400).json({ message: "Please check if all variables are filled!" });
        return;
    }

    const quiz = {
        tema: req.body.tema,
        desc_quiz: req.body.desc_quiz,
        pergunta: req.body.pergunta,
        resposta1: req.body.resposta1,
        resposta2: req.body.resposta2,
        resposta3: req.body.resposta3,
        resposta4: req.body.resposta4,
        resposta_certa: req.body.resposta_certa,
    };

    Quiz.create(quiz, (err, data) => {
        if (err)
            res.status(500).json({
                message: err.message || "Some error occurred while creating this quiz."
            });
        else {
            res.status(201).json({ message: "New quiz created.", location: "/quizzes/" + data.insertId });
        }
    });
};
exports.delete = (req, res) => {
    Quiz.remove(req.params.quizID, (err, data) => { 
        if (err) {
            if (err.kind === 'not found')
                res.status(404).json({
                    message: `Not found quiz with id ${req.params.quizID}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving quiz with id ${req.params.quizID}.`
                });
        } else
            res.status(200).json({
                message: `Deleted with sucess quiz with id ${req.params.quizID}.`
            });
    }); 
};
