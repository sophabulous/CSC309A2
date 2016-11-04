$(document).ready(function() {

    $('#statusparent').click(function() {
        $('.status').toggleClass('visible');
        $('.courseid').removeClass('visible');
        $('.familyname').removeClass('visible');
        $('.addapplicant').removeClass('visible');
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
    });

    $('#addapplicantparent').click(function() {
        $('.addapplicant').toggleClass('visible');
        $('.status').removeClass('visible');
        $('.familyname').removeClass('visible');
        $('.courseid').removeClass('visible');
    });

    $('#applicantsparent').click(function() {
        $.get('/applicants', function(data) {
            showApplicants(data);
        });
    });

    function showApplicants(data) {
        // $(".allapplicants").html(data);

        $( "#header" ).nextAll().remove();
        var obj = jQuery.parseJSON(data)["tas"];
        $.each( obj, function( key, value ) {
            console.log( value["givenname"] + '|' + value["familyname"] + '|' + value["status"] + '|' + value["year"]);
            $(".allapplicants").append('<tr><td>' + value["givenname"] + '</td>' + '<td>' + 
                value["familyname"] + '</td>' + '<td>' + value["status"] + '</td>' + '<td>' + value["year"] + '</td></tr>');
        });
    }
});


