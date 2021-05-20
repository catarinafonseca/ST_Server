const sql = require("./db.js"); 

const Quiz = function (quiz) {
    this.tema = quiz.tema;
    this.desc_quiz = quiz.desc_quiz;
    this.pergunta = quiz.pergunta;
    this.resposta1 = quiz.resposta1;
    this.resposta2 = quiz.resposta2;
    this.resposta3 = quiz.resposta3;
    this.resposta4 = quiz.resposta4;
    this.resposta_certa = quiz.resposta_certa;
};

// METHODS 
Quiz.getAll = (result) => {
    sql.query("SELECT * FROM quiz", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};
Quiz.findById = (id, result) => {
    sql.query("SELECT * FROM quiz WHERE idQuiz=?", [id], (err, res) => {
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
Quiz.create = (newQuiz, result) => {
    sql.query("INSERT INTO quiz SET ?", newQuiz, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};/* 
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
}; */
// EXPORT MODEL (required by CONTROLLER)
module.exports = Quiz;