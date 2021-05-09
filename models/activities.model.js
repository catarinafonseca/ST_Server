const sql = require("./db.js");

const Activity = function (activity) {
    this.nome = activity.nome;
    this.desc_atividade = activity.desc_atividade;
    this.num_participantes = activity.num_participantes;
    this.imagem = activity.imagem;
    this.certificado_SN = activity.certificado_SN;
    this.data_hora = activity.data_hora;
    this.idLocal = activity.idLocal;
    this.idCategoria = activity.idCategoria;
};

// METHODS
Activity.getAll = (result) => {
    sql.query("SELECT * FROM atividade", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
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
        result({ kind: 'not found' }, null);
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
        query,[activity, { idAtividade: idActivity }],(err, res) => {
            //console.log(q.sql); // to check the query string

            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, res);
        });
};

/* Activity.findForText = (text, result) => {
    sql.query("SELECT * FROM atividade WHERE nome=?", [text], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return
        }
        result({ kind: 'not found' }, null);
    });
};
Activity.findByType = (type, result) => {
    sql.query("SELECT * FROM atividade WHERE idCategoria = (SELECT idCategoria FROM categoria WHERE type = ?)", [type], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return
        }
        result({ kind: 'not found' }, null);
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
        result({ kind: 'not found' }, null);
    });
}; */
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