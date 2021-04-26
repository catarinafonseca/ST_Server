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
// EXPORT MODEL (required by CONTROLLER)
module.exports = Activity;