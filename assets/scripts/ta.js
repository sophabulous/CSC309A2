$(document).ready(function() {

    $('#statusparent').click(function() {
        $('.status').toggleClass('visible');
        $('.courseid').removeClass('visible');
        $('.familyname').removeClass('visible');
        $('.addapplicant').removeClass('visible');
        $('.allapplicants').removeClass('visible');
        $('.applicantforcourse').removeClass('visible');
    });

    $('#familynameparent').click(function() {
        $('.familyname').toggleClass('visible');
        $('.courseid').removeClass('visible');
        $('.status').removeClass('visible');
        $('.addapplicant').removeClass('visible');
        $('.applicantforcourse').removeClass('visible');
    });

    $('#courseidparent').click(function() {
        $('.courseid').toggleClass('visible');
        $('.status').removeClass('visible');
        $('.familyname').removeClass('visible');
        $('.addapplicant').removeClass('visible');
        $('.allapplicants').removeClass('visible');
        $('.applicantforcourse').removeClass('visible');
    });

    $('#addapplicantparent').click(function() {
        $('.addapplicant').toggleClass('visible');
        $('.status').removeClass('visible');
        $('.familyname').removeClass('visible');
        $('.courseid').removeClass('visible');
        $('.allapplicants').removeClass('visible');
        $('.applicantforcourse').removeClass('visible');
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
        $('.courseid').removeClass('visible');
        $('.familyname').removeClass('visible');
        $('.addapplicant').removeClass('visible');
        $('.applicantforcourse').addClass('visible');
        $('.status').removeClass('visible');

        $.get('/courses', function(data) {
            showApplicantsForCourse(data);
        });
    });

    $('#courseIDbutton').click(function() {
        $('.allapplicants').removeClass('visible');
        $('.coursestable').removeClass('visible');
        $('.applicantforcourse').addClass('visible');

        var course = $('#courseinput').val();
        $.get('/courses?course=' + course, function(data) {

            showApplicantsForCourse(data);
        });
    });

    $('#addapplicantbutton').click(function() {
        $('.allapplicants').removeClass('visible');
        $('.coursestable').removeClass('visible');
        $('.applicantforcourse').removeClass('visible');

        var course = $('#courseinput').val();
        $.post('/applicants', function(data) {

        });
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
            tas.sort(sortBy("ranking") );
            if (jQuery.isEmptyObject(tas)){                             
                $(".applicantforcourse").append('<tr><th colspan="5">' + value["courses"]["code"] + '</th></tr>'+ 
                    '<tr><td> N/A </td><td> N/A </td><td> N/A </td><td> N/A </td> <td> N/A </td></tr>');
            }else{
                var counter = 0;
                $.each( tas, function( k, v ) {
                    console.log(v);
                    if (counter == 0) {
                        $(".applicantforcourse").append('<tr><th colspan="5">' + value["courses"]["code"] + '</th></tr>' + 
                        '<tr><td>' + v["ranking"] + '</td>' + '<td>' + v["experience"] + '</td>' + '<td>' + v["status"] + 
                        '</td>' + '<td>' + v["givenname"] + '</td>' + '<td>' + v["familyname"] + '</td></tr>');
                    }else{
                        $(".applicantforcourse").append('<tr><td>' + v["ranking"] + '</td>' + '<td>' + v["experience"] + '</td>' + '<td>' + v["status"] + 
                            '</td>' + '<td>' + v["givenname"] + '</td>' + '<td>' + v["familyname"] + '</td></tr>');
                    }
                    counter++;

                });
            }

        });
    }
    

});


