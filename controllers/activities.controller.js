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

//create
exports.create = (req, res) => {
    // Validate request
    if (!req.body || !req.body.title) {
        res.status(400).json({ message: "Title can not be empty!" });
        return;
    }

    // Create a Tutorial object
    const activity = {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        hour: req.body.hour,
        numPeople: req.body.numPeople,
        certificate: req.body.certificate,
        image: req.body.image,
    };

    // Save Tutorial in the database
    Activity.create(activity, (err, data) => {
        if (err)
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Activity."
            });
        else{
            // all is OK, send new tutorial ID in the response
            res.status(201).json({ message: "New activity created.", location: "/activities/" + data.insertId });
        } 
            
    });
};

