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
    // results['courses'] = [];

    if (Object.keys(req.query).length === 0) {

        for (var i in courses) {
            result = {};
            result['code'] = courses[i];
            result['tas'] = [];
            for (var j in tas) {
                for (var z in tas[j]["courses"]) {
                    if (tas[j]["courses"][z]["code"] === courses[i]) {

                        result['tas'].push({'stunum':tas[j]["stunum"], 'givenname':tas[j]["givenname"], 
                            'familyname':tas[j]["familyname"], 'status':tas[j]["status"], 'year':tas[j]["year"],
                            'ranking':tas[j]["courses"][z]["rank"], 'experience':tas[j]["courses"][z]["experience"]});

                    }
                }
            }
            results.push({courses: result});
        }
        res.send(JSON.stringify(results));
    }else{
         if ("course" in req.query) {
            var requestedCourse = req.query.course;

            for (var j in tas) {
                result = {};
                result['tas'] = [];
                for (var z in tas[j]["courses"]) {
                    if (tas[j]["courses"][z]["code"] === requestedCourse) {
                        result['code'] = tas[j]["courses"][z]["code"];
                        result['tas'].push({'stunum':tas[j]["stunum"], 'givenname':tas[j]["givenname"], 
                            'familyname':tas[j]["familyname"], 'status':tas[j]["status"], 'year':tas[j]["year"],
                            'ranking':tas[j]["courses"][z]["rank"], 'experience':tas[j]["courses"][z]["experience"]});

                    }
                }
                results.push({courses: result});
            }
            
            res.send(JSON.stringify(results));
         }

    }
};


exports.addApplicants= function(req, res) {
    console.log(req.body);
    var applicant = req.body;
    
    applicants.longlist.push(applicant);
    res.send("Success");
};