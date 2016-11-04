var fs = require('fs');

// Putting the data in this file is a hack. Even when using
// a json file as data, we should really put the data management
// in a file separate from the routes file.
var courseObj;
var applicants;
fs.readFile('courses.json', 'utf-8', function(err, data) {
    if(err) throw err;
    courseObj = JSON.parse(data);
});

fs.readFile('tas.json', 'utf-8', function(err, data) {
    if(err) throw err;
    applicants = JSON.parse(data);
});


exports.findAllApplicants = function(req, res) {
    res.send(JSON.stringify(applicants));
};

exports.findById = function(req, res) {
    var id = req.params.id;
    res.send(JSON.stringify(courseObj.longlist[id]));
};

