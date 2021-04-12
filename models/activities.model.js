const sql = require("./db.js"); // get DB connection
// define ACTIVITY model constructor
const Activity = function (activity) {
    this.name = activitiy.name;
    this.description = activitiy.description;
    this.type = activitiy.type;
    this.local = activitiy.local;
    this.date = activitiy.date;
    this.hour = activitiy.hour;
    this.numPeople = activitiy.numPeople; 
    this.certificate = activitiy.certificate; 
    this.image = activitiy.image;
    this.concluded = activitiy.concluded; 
    this.full = activitiy.full; 
    this.points = activitiy.points;
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