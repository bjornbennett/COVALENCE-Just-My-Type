let doc = $(document),
    kuc = $('#keyboard-upper-container'),
    klc = $('#keyboard-lower-container'),
    shiftDown,
    keyChart = [ 
        ['`',96],[1,49],[2,50],[3,51],[4,52],[5,53],[6,54],[7,55],[8,56],[9,57],['0',48],['-',45],['=',61],['a',97],['b',98],['c',99],['d',100],['e',101],['f',102],['g',103],['h',104],['i',105],['j',106],['k',107],['l',108],['m',109],['n',110],['o',111],['p',112],['q',113],['r',114],['s',115],['t',116],['u',117],['v',118],['w',119],['x',120],['y',121],['z',122],['[',91],[']',93],['\\',92],[';',59],["'",39],[',',44],['.',46],['/',47],['Space',32]
    ],
    kC;

doc.ready(function(){
    kuc.addClass('hide-me'); // hide uppercase keyboard

    shiftDown = false;
    doc.on('keydown', function(keyCode){
        kC = keyCode.key;
        console.log('key: '+ keyCode.key + ', keycode: '+keyCode.which);

        if( keyCode.key == 'Shift' ){ // if shift key, show/hide uppercase keyboard
            console.log('shift key');
            klc.addClass('hide-me');
            kuc.removeClass('hide-me');
            shiftDown = true;
        }
        // highlight lowercase keys
        for (let i = 0; i < keyChart.length; i++) {
            let one = keyChart[i][0],
                two = keyChart[i][1];
            if(kC == one){
                whichKey( one, two); 
                console.log(one, two, kC);       
            }else if( keyCode.keyCode == 32 ){ // ************* the space .key doesn't show a value, but .keyCode does
                $('#32').addClass('highlighter');
                console.log('highlighter has been used.');    
            } 
        }
        if(shiftDown == true ){
            // whichKey('A',65);
            // whichKey('B',66);
            // whichKey('C',67);
        }
    }).on('keyup', function(){ // release keys, hide uppercase keyboard, remove hightlighted letters class
        //console.log('shift key released');
        kuc.addClass('hide-me');
        klc.removeClass('hide-me');
        $('.well').removeClass('highlighter');
        shiftDown = false;
    });

    function whichKey(letter,id){
        if( kC == letter ){
            $('#'+id).addClass('highlighter');
            console.log('highlighter has been used.');
        }
    }

});