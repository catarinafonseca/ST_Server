const sql = require("./db.js"); 

const User = function (user) {
    this.nome = user.nome;
    this.email = user.email;
    this.idTipo = user.idTipo;
    this.password = user.password;
    this.foto = user.foto;
    this.idCurso = user.idCurso;
    this.data_nasc = user.data_nasc;
    this.idNivel = user.idNivel;
};

// METHODS 
User.getAll = (result) => {
    sql.query("SELECT * FROM utilizador", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};
User.findById = (id, result) => {
    sql.query("SELECT * FROM utilizador WHERE idUtilizador=?", [id], (err, res) => {
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
User.create = (newUser, result) => {
    sql.query("INSERT INTO utilizador SET ?", newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};
User.remove = (id, result) => {
    sql.query("DELETE FROM utilizador WHERE idUtilizador=?", [id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows) {
            result(null, res[0]);
            return
        }
        result({ kind: 'not found' }, null); 
    });
};
User.updateById = (idUser, user, result) => {
    let query = 'UPDATE utilizador SET ? WHERE ?';

    let q = sql.query(
        query,[user, { idUtilizador: idUser}],(err, res) => {
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
// EXPORT MODEL (required by CONTROLLER)
module.exports = User;