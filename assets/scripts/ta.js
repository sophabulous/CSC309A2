$(document).ready(function() {

    $('#statusparent').click(function() {
        $('.status').toggleClass('visible');
        $('.courseid').removeClass('visible');
        $('.familyname').removeClass('visible');
        $('.addapplicant').removeClass('visible');
        $('.allapplicants').removeClass('visible');
    });

    $('#familynameparent').click(function() {
        $('.familyname').toggleClass('visible');
        $('.courseid').removeClass('visible');
        $('.status').removeClass('visible');
        $('.addapplicant').removeClass('visible');
    });

    $('#courseidparent').click(function() {
        $('.courseid').toggleClass('visible');
        $('.status').removeClass('visible');
        $('.familyname').removeClass('visible');
        $('.addapplicant').removeClass('visible');
        $('.allapplicants').removeClass('visible');
    });

    $('#addapplicantparent').click(function() {
        $('.addapplicant').toggleClass('visible');
        $('.status').removeClass('visible');
        $('.familyname').removeClass('visible');
        $('.courseid').removeClass('visible');
        $('.allapplicants').removeClass('visible');
    });

    $('#applicantsparent').click(function() {
        $('.allapplicants').toggleClass('visible');
        $('.addapplicant').removeClass('visible');
        $('.status').removeClass('visible');
        $('.familyname').removeClass('visible');
        $('.courseid').removeClass('visible');
        
        $.get('/applicants', function(data) {
            showApplicants(data);
        });
    });

    $('#statusbutton').click(function() {
        $('.allapplicants').addClass('visible');
        var status = $( "#selectstatus" ).val();
        $.get('/applicants?status=' + status, function(data) {
            showApplicants(data);
        });
    });

    $('#familynamebutton').click(function() {
        $('.allapplicants').addClass('visible');
        $('.coursestable').addClass('visible');
        var fname = $('#familynameinput').val();
        $.get('/applicants?fname=' + fname, function(data) {
            showApplicantsFull(data);
        });
    });

    $('#coursesparent').click(function() {
        $('.allapplicants').removeClass('visible');
        $('.coursestable').removeClass('visible');
        $('.applicantforcourse').addClass('visible');

        $.get('/courses', function(data) {
            console.log("in courses");
            showApplicantsForCourse(data);
        });
    });

    function showApplicants(data) {

        $( "#header" ).nextAll().remove();  
        var obj = jQuery.parseJSON(data);

        $.each( obj, function( key, value ) {
            console.log( value["givenname"] + '|' + value["familyname"] + '|' + value["status"] + '|' + value["year"]);
            $(".allapplicants").append('<tr><td>' + value["givenname"] + '</td>' + '<td>' + 
                value["familyname"] + '</td>' + '<td>' + value["status"] + '</td>' + '<td>' + value["year"] + '</td></tr>');
        });
    }

    function showApplicantsFull(data) {

        $( "#header" ).nextAll().remove();  
        $( "#courseheader" ).nextAll().remove();
        var obj = jQuery.parseJSON(data);

        $.each( obj, function( key, value ) {
            var courses = value["courses"];

            $(".allapplicants").append('<tr><td>' + value["givenname"] + '</td>' + '<td>' + 
                value["familyname"] + '</td>' + '<td>' + value["status"] + '</td>' + '<td>' + value["year"] + '</td></tr>');

            $.each( courses, function( k, v ) { 
                $(".coursestable").append('<tr><td>' + v["code"] + '</td>' + '<td>' + 
                    v["rank"] + '</td>' + '<td>' + v["experience"] + '</td></tr>');
            });
        });
    }

    function showApplicantsForCourse(data) {

        $( "#appcheader" ).nextAll().remove();

        var obj = jQuery.parseJSON(data);

        $.each( obj, function( key, value ) {
            var tas = value["courses"]["tas"];
            if (jQuery.isEmptyObject(tas)){
                $(".applicantforcourse").append('<tr><td>' + value["courses"]["code"] + '</td>'+ 
                    '<td> N/A </td><td> N/A </td><td> N/A </td><td> N/A </td> <td> N/A </td></tr>');
            }else{
                $(".applicantforcourse").append('<tr><td>' + value["courses"]["code"] + '</td>' + '<td>' + tas["ranking"] 
                    + '</td>' + '<td>' + tas["experience"] + '</td>' + '<td>' + tas["status"] + '</td>' + '<td>' + tas["givenname"] 
                    + '</td>' + '<td>' + tas["familyname"] + '</td></tr>');

            }

        });
    }
    

});


