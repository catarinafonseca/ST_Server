// get resource model (definition and DB operations)
const Activity = require('../models/activities.model.js');
// EXPORT function to display list of all Activitys (required by ROUTER)
exports.findAll = (req, res) => {
    Activity.getAll((err, data) => {
        if (err) // send error response
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Activitys."
            });
        else
            res.status(200).json(data); // send OK response with all Activitys data
    });
};
//list one Activity
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
//remove
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
