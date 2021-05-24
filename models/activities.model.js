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
    //console.log(query);
    // example of how to use a whitelist
    const whitelist = ['nome', 'local', 'categoria'];

    // set up an empty array to contain the WHERE conditions
    let where = [];
    let queryStr = `SELECT * FROM atividade`;

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
        //console.log(key);
        // if we've made it this far, add the clause to the array of conditions
       
        if (key === 'local') {
            where.push(` atividade.idLocal = local.idLocal AND local.desc_local = "${obj[key]}"`);
            queryStr = queryStr + ',local'
        }
        if (key === 'categoria') {
            where.push(` atividade.idCategoria = categoria.idCategoria AND categoria.desc_categoria = "${obj[key]}"`);
            queryStr = queryStr + ',categoria'
        }  
        if (key === 'nome') {
            where.push(`\`${key}\` LIKE "%${obj[key]}%"`);
        }  
        

    });

    // convert the where array into a string of AND clauses
    where = where.join(' AND ');
    //console.log(where);


    // if there IS a WHERE string, prepend with WHERE keyword
    if (where) {
        where = ` WHERE ${where}`;
         queryStr = queryStr + where

        console.log(queryStr);
        sql.query(queryStr, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        });
    } else {
        

        console.log(queryStr);
        sql.query(queryStr, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        });
    }


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