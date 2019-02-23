let doc = $(document),
    kuc = $('#keyboard-upper-container'),
    klc = $('#keyboard-lower-container');
doc.ready(function(){
    $('#keyboard-upper-container').addClass('hide-me');

    doc.on('keydown', function(keyCode){
        console.log('key: '+ keyCode.key + ', keycode: '+keyCode.which);
        if( keyCode.key == 'Shift' ){
            console.log('shift key');
            klc.addClass('hide-me');
            kuc.removeClass('hide-me');
        }
    }).on('keyup', function(){
        //console.log('shift key released');
        kuc.addClass('hide-me');
        klc.removeClass('hide-me');
    });

    function keyPressed(a){
        if( keyCode.which == a ){
            console.log('key pressed');
            $().addClass('highlighter');
        }
    }
    function keyReleased(a){
        console.log('key released');
        $().removeClass('highlighter');
    }

});