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
Activity.getAll = (query,result) => {
    
    const obj = query
    console.log(query);
    // example of how to use a whitelist
    const whitelist = ['nome', 'idLocal', 'idCategoria'];

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
        console.log(obj[key]);
        // if we've made it this far, add the clause to the array of conditions
       
        if (obj[key] === 'idLocal') {
            where.push(`\`${key}\` = "${obj[key]}"`);
        } 
        if (obj[key] === 'idCategoria') {
            where.push(`\`${key}\` = "${obj[key]}"`);
        }  
        if (obj[key] === 'nome') {
            where.push(`\`${key}\` like %${obj[key]}%`);
        }  
        else {
            where.push(`\`${key}\` = "${obj[key]}"`);
        }

    });

    // convert the where array into a string of AND clauses
    where = where.join(' AND ');

    // if there IS a WHERE string, prepend with WHERE keyword
    if (where) {
        where = `WHERE ${where}`;
    }

    const queryStr = `SELECT * FROM atividade  ${where}`;

    console.log(queryStr);
    sql.query(queryStr, (err, res) => {
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
        query, [activity, { idAtividade: idActivity }], (err, res) => {
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