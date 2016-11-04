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


});


