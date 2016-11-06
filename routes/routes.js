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

function sortBy(prop){
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
}


exports.findAllApplicants = function(req, res) {
    var result = applicants["tas"];
    if (Object.keys(req.query).length === 0) {
        console.log("this is find all");
        result.sort(sortBy("familyname") );
        res.send(JSON.stringify(result));
    }else{
        if ("status" in req.query) {
            console.log('this is status');
            var status = req.query.status;
            var applicantswithstatus = {};

            for (var key in result) {
                if (result[key]["status"] === status) {
                    applicantswithstatus[key] = result[key];
                }
            }
            res.send(JSON.stringify(applicantswithstatus));
        }

        if ("fname" in req.query) {
            var fname = req.query.fname;
            var applicantswithfname = {};

            for (var key in result) {
                if (result[key]["familyname"] === fname) {
                    applicantswithfname[key] = result[key];
                    console.log(applicantswithfname);
                }
            }
            res.send(JSON.stringify(applicantswithfname));
        }
    }

};

exports.findApplicantForCourses= function(req, res) {
    var tas = applicants["tas"];
    var courses = courseObj["courses"];
    var results = [];

    for (var i in courses) {
        result = {};
        result['code'] = courses[i];
        result['tas'] = {};
        for (var j in tas) {
            for (var z in tas[j]["courses"]) {
                if (tas[j]["courses"][z]["code"] === courses[i]) {

                    result['tas']['stunum'] = tas[j]["stunum"];
                    result['tas']['givenname'] = tas[j]["givenname"];
                    result['tas']['familyname'] = tas[j]["familyname"];
                    result['tas']['status'] = tas[j]["status"];
                    result['tas']['year'] = tas[j]["year"];
                    result['tas']['ranking'] = tas[j]["courses"][z]["rank"];
                    result['tas']['experience'] = tas[j]["courses"][z]["experience"];

                }
            }
        }
        results.push({courses: result});
    }
    res.send(JSON.stringify(results));
};
