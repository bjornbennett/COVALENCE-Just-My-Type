$(document).ready(function(){
    $('#keyboard-upper-container').addClass('hide-me');

    $(document).on('keydown', function(keyCode){
        if( keyCode.which == '16' ){
            console.log('shift key');
            $('#keyboard-lower-container').addClass('hide-me');
            $('#keyboard-upper-container').removeClass('hide-me');
        }
    }).on('keyup', function(){
        console.log('key released');
        $('#keyboard-upper-container').addClass('hide-me');
        $('#keyboard-lower-container').removeClass('hide-me');
    });

    // $( "body" ).on( "keydown", function( event ) {
    //     $( "#log" ).html( event.type + ": " +  event.which );
    //   });
});