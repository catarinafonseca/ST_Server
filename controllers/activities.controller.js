const Activity = require('../models/activities.model.js');

exports.findAll = (req, res) => {
    Activity.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Activities."
            });
        else
            res.status(200).json(data);
    });
};
exports.findOne = (req, res) => {
    Activity.findById(req.params.activityID, (err, data) => {
        if (err) {
            if (err.kind === 'not found')
                res.status(404).json({
                    message: `Not found Activity with id ${req.params.activityID}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving Activity with id ${req.params.activityID}.`
                });
        } else
            res.status(200).json(data);
    });
};
exports.delete = (req, res) => {
    Activity.remove(req.params.activityID, (err, data) => {
        if (err) {
            if (err.kind === 'not found')
                res.status(404).json({
                    message: `Not found Activity with id ${req.params.activityID}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving Activity with id ${req.params.activityID}.`
                });
        } else
            res.status(200).json({
                message: `Deleted with sucess Activity with id ${req.params.activityID}.`
            });
    });
};
exports.create = (req, res) => {
    const activity = {
        nome: req.body.nome,
        desc_atividade: req.body.desc_atividade,
        num_participantes: req.body.num_participantes,
        imagem: req.body.imagem,
        certificado_SN: req.body.certificado_SN,
        data_hora: req.body.data_hora,
        idLocal: req.body.idLocal,
        idCategoria: req.body.idCategoria
    };
    // Validate request
    if (!req.body || !activity) {
        res.status(400).json({ message: "Please check if all variables are filled!" });
        return;
    }

    Activity.create(activity, (err, data) => {
        if (err)
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Activity."
            });
        else {
            res.status(201).json({ message: "New activity created.", location: "/activities/" + data.insertId });
        }
    });
};
exports.update = (req, res) => {
    const activity = {
        nome: req.body.nome,
        desc_atividade: req.body.desc_atividade,
        num_participantes: req.body.num_participantes,
        imagem: req.body.imagem,
        certificado_SN: req.body.certificado_SN,
        data_hora: req.body.data_hora,
        idLocal: req.body.idLocal,
        idCategoria: req.body.idCategoria
    };
    // Validate request
    if (!req.body || !activity) {
        res.status(400).json({ message: "Please check if all variables are filled!" });
        return;
    }

    Activity.updateById(req.params.activityID, activity, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found activity with id ${req.params.activityID}.`
                });
            } else {
                res.status(500).json({
                    message: "Error updating activity with id " + req.params.activityID,

                });
            }
        } else
            res.status(200).json({ message: "Updated activity.", location: `/activities/${req.params.activityID}` });
    });
};
const obj = {
    "title": "",
    "type": "",
    "local": "",
}

// example of how to use a whitelist
const whitelist = ['title','type','local'];

// set up an empty array to contain the WHERE conditions
let where = [];

// Iterate over each key / value in the object
Object.keys(obj).forEach(function (key) {
    // if the key is not whitelisted, do not use
    if (!whitelist.includes(key)) {
        return;
    }
    // if the value is an empty string, do not use
    if ('' === obj[key]) {
        return;
    }
    // if we've made it this far, add the clause to the array of conditions
    where.push(`\`${key}\` = "${obj[key]}"`);
});

// convert the where array into a string of AND clauses
where = where.join(' AND ');

// if there IS a WHERE string, prepend with WHERE keyword
if (where) {
    where = `WHERE ${where}`;
}

const sql = `SELECT * FROM table ${where}`;

console.log(sql);
  // SELECT * FROM table WHERE `a` = "1" AND `c` = "foo"
/*


exports.findFilters = (req, res) => {
    Activity.findByType(req.params.type, (err, data) => {
        console.log(req.params.typ);
        if (err) {
            if (err.kind === 'not found')
                res.status(404).json({
                    message: `Not found Activity with id ${req.params.activityID}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving Activity with id ${req.params.activityID}.`
                });
        } else
            res.status(200).json(data);
    });
    const {
        text,
        local,
        type
    } = req.query;
    let condition = type ? {
        text: {
            [Op.like]: `%${type}%`
        }
    } : null;
    condition += local ? {
        local: {
            [Op.like]: `%${local}%`
        }
    } : null;
    condition += text ? {
        type: {
            [Op.like]: `%${text}%`
        }
    } : null;
    Activity.findAndCountAll({
        where: condition
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        })
};*/
