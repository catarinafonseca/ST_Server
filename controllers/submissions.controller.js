const Submission = require('../models/submissions.model.js');

exports.findAll = (req, res) => {
    Submission.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Submissions."
            });
        else
            res.status(200).json(data);
    });
};
exports.findOne = (req, res) => {
    Submission.findById(req.params.submissionID, (err, data) => {
        if (err) {
            if (err.kind === 'not found')
                res.status(404).json({
                    message: `Not found Submission with id ${req.params.submissionID}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving Submission with id ${req.params.submissionID}.`
                });
        } else
            res.status(200).json(data);
    });
};
exports.create = (req, res) => {
    // Validate request
    if (!req.body || !req.body.idUtilizador || !req.body.idAtividade || !req.body.data_hora) {
        res.status(400).json({ message: "Please check if all variables are filled!" });
        return;
    }

    const submission = {
        idUtilizador: req.body.idUtilizador,
        idAtividade: req.body.idAtividade,
        data_hora: req.body.data_hora,
    };

    Submission.create(submission, (err, data) => {
        if (err)
            res.status(500).json({
                message: err.message || "Some error occurred while creating this submission."
            });
        else {
            res.status(201).json({ message: "New submission created.", location: "/submissions/" + data.insertId });
        }
    });
};
exports.delete = (req, res) => {
    Submission.remove(req.params.submissionID, (err, data) => { 
        if (err) {
            if (err.kind === 'not found')
                res.status(404).json({
                    message: `Not found user with id ${req.params.submissionID}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving user with id ${req.params.submissionID}.`
                });
        } else
            res.status(200).json({
                message: `Deleted with sucess user with id ${req.params.submissionID}.`
            });
    }); 
};