let doc = $(document),
    kuc = $('#keyboard-upper-container'),
    klc = $('#keyboard-lower-container'),
    shiftDown;

doc.ready(function(){
    kuc.addClass('hide-me'); // hide uppercase keyboard

    shiftDown = false;
    doc.on('keydown', function(keyCode){
        console.log('key: '+ keyCode.key + ', keycode: '+keyCode.which);

        if( keyCode.key == 'Shift' ){ // if shift key, show/hide uppercase keyboard
            console.log('shift key');
            klc.addClass('hide-me');
            kuc.removeClass('hide-me');
            shiftDown = true;
        }
        if(shiftDown == true ){
            if( keyCode.key == 'A' ){
                console.log('key "A" pressed');
                $('#65').addClass('highlighter');
            }
        } else {
            if( keyCode.key == 'a' ){
                console.log('key a pressed');
                $('#97').toggleClass('highlighter');
            }
        }
    }).on('keyup', function(){ // release keys, hide uppercase keyboard, remove hightlighted letters class
        console.log('shift key released');
        kuc.addClass('hide-me');
        klc.removeClass('hide-me');
        $('.well').removeClass('highlighter');
        shiftDown = false;
    });

    // function keyPressed(keyCode, a){
    //     if( keyCode.which == a ){
    //         console.log('key pressed');
    //         $().addClass('highlighter');
    //     }
    // }
    // function keyReleased(a){
    //     console.log('key released');
    //     $().removeClass('highlighter');
    // }

});