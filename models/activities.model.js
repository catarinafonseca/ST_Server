const sql = require("./db.js"); // get DB connection
// define ACTIVITY model constructor
const Activity = function (activity) {
    this.nome = activity.nome;
    this.desc_atividade = activity.desc_atividade;
    this.num_participantes = activity.num_participantes;
    this.imagem = activity.imagem;
    this.certificado_SN = activity.certificado_SN;
    this.data_inicio = activity.data_inicio;
    this.hora_inicio = activity.hora_inicio;
};
// define method getAll to handle getting all activities from DB
// result = "(error, data)", meaning it will return either an error message or some sort of data 
Activity.getAll = (result) => {
    sql.query("SELECT * FROM atividade", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res); // the result will be sent to the CONTROLLER
    });
};
Activity.create = (newActivity, result) => {
    sql.query("INSERT INTO atividade SET ?", newActivity, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};
Activity.findById = (id, result) => {
    sql.query("SELECT * FROM atividade WHERE idAtividade=?", [id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return
        }
        result({ kind: 'not found' }, null); // the result will be sent to the CONTROLLER
    });
};
Activity.remove = (id, result) => {
    sql.query("DELETE FROM atividade WHERE idAtividade=?", [id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows) {
            result(null, res[0]);
            return
        }
        result({ kind: 'not found' }, null); // the result will be sent to the CONTROLLER
    });
};
Activity.updateById = (idActivity, activity, result) => {

    let query = 'UPDATE atividade SET ? WHERE ?';

    let q = sql.query(
        query,
        // OR [tutorial.title, tutorial.description, tutorial.published, id]
        [activity, { idAtividade: idActivity }], // objects are turned into key = 'val' pairs for each enumerable property
        (err, res) => {

            //console.log(q.sql); // to check the query string

            if (err) {
                result(err, null);
                return;
            }
            // res.affectedRows: number of selected rows to update
            // res.changedRows: number of effectively updated rows

            // not found Tutorials with the specified ID: setup a new error property 'kind'
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, res);
        });
};
Activity.findForText = (text, result) => {
    sql.query("SELECT * FROM atividade WHERE textAtividade=?", [text], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return
        }
        result({ kind: 'not found' }, null); // the result will be sent to the CONTROLLER
    });
};
Activity.findForType = (type, result) => {
    sql.query("SELECT * FROM atividade WHERE typeAtividade=?", [type], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return
        }
        result({ kind: 'not found' }, null); // the result will be sent to the CONTROLLER
    });
};
Activity.findForLocal = (local, result) => {
    sql.query("SELECT * FROM atividade WHERE localAtividade=?", [local], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return
        }
        result({ kind: 'not found' }, null); // the result will be sent to the CONTROLLER
    });
};
/* se fosse só verificar o tipo
exports.findAll = (req, res) => {
    const {
        text,
        local,
        type
    } = req.query;
    const condition = text ? {
        text: {
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
}; */
// EXPORT MODEL (required by CONTROLLER)
module.exports = Activity;