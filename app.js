let doc = $(document),
    kuc = $('#keyboard-upper-container'),
    klc = $('#keyboard-lower-container'),
    shiftDown,
    kcl = [ 
        ['`',96],[1,49],[2,50],[3,51],[4,52],[5,53],[6,54],[7,55],[8,56],[9,57],['0',48],['-',45],['=',61],['a',97],['b',98],['c',99],['d',100],['e',101],['f',102],['g',103],['h',104],['i',105],['j',106],['k',107],['l',108],['m',109],['n',110],['o',111],['p',112],['q',113],['r',114],['s',115],['t',116],['u',117],['v',118],['w',119],['x',120],['y',121],['z',122],['[',91],[']',93],['\\',92],[';',59],["'",39],[',',44],['.',46],['/',47],['Space',32]
    ],
    kcu = [ ['~',126],['!',33],['@',64],['#',35],['$',36],['%',37],['^',94],['&',38],['*',42],['(',40],[')',41],['_',95],['+',43],['A',65],['B',66],['C',67],['D',68],['E',69],['F',70],['G',71],['H',72],['I',73],['J',74],['K',75],['L',76],['M',77],['N',78],['O',79],['P',80],['Q',81],['R',82],['S',83],['T',84],['U',85],['V',86],['W',87],['X',88],['Y',89],['Z',90],['{',123],['}',125],['|',124],[':',58],['"',34],['<',60],['>',62],['?',63]
    ],
    kC;

doc.ready(function(){
    kuc.addClass('hide-me'); // hide uppercase keyboard

    shiftDown = false;
    doc.on('keydown', function(keyCode){
        kC = keyCode.key;
        //console.log('key: '+ keyCode.key + ', keycode: '+keyCode.which);

        // highlight lowercase keys
        cycleThroughKeys(kcl);
        // the space .key doesn't show a value, but .keyCode does
        if( keyCode.keyCode == 32 ){ 
            $('#32').addClass('highlighter');
        } 
        // if shift key, show/hide uppercase keyboard
        if( keyCode.key == 'Shift' ){ 
            //console.log('shift key');
            klc.addClass('hide-me');
            kuc.removeClass('hide-me');
            shiftDown = true;
        }
        // if shift key, find uppercase values
        if(shiftDown == true ){
            cycleThroughKeys(kcu);
            shiftDown = true;
        }
    }).on('keyup', function(){ 
        // release keys, hide uppercase keyboard, remove hightlighted letters class
        kuc.addClass('hide-me');
        klc.removeClass('hide-me');
        $('.well').removeClass('highlighter');
        shiftDown = false;
        //console.log('shift key released');
    });

    function whichKey(letter,id){
        if( kC == letter ){
            $('#'+id).addClass('highlighter');
            //console.log('highlighter has been used.');
        }
    }
    function cycleThroughKeys(array){
        for (let i = 0; i < array.length; i++) {
            let one = array[i][0],
                two = array[i][1];
            if(kC == one){
                whichKey( one, two); 
            }
        }
    }
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    //let sentences = ['ten ate neite ate nee enet ite ate inet ent eate'];
    // let sentences = ["Several years ago, I was often out on business.", "At all of my stops, I would seek a meeting place on weekends","off my own bat, to share the Lords words and pray.","But after some of the meetings, the church leaders","which denomination do you belong to?","What are the doctrines of your church?"];
    let wordCount = 0;
    for (let i = 0; i < sentences.length; i++) {
        const element = sentences[i];
        let a = element.split(' ').length;
        wordCount += a;
        console.log('wordcount = '+wordCount);
    }

    let whichSentence = 0,
        letterCounter = 0,
        errors = 0,
        ybPos = 0,
        minutes,
        startTime,
        finishTime,
        totalTime,
        errorTicker = 0;

    $('#flex-container p').append(sentences[whichSentence]);
    $('#target-letter').html(sentences[whichSentence][letterCounter]);
    
    doc.on('keydown',function(event){
        // track sentence in sentences array
        if(whichSentence <= (sentences.length) -1){

            //track letters in current sentence
            if(letterCounter <= (sentences[whichSentence].length) -2){
                // console.log(letterCounter, sentences[whichSentence].length, sentences[whichSentence][letterCounter]);
                
                //if letter is same as key pressed
                if(sentences[whichSentence][letterCounter] == event.key){
                    //console.log('shift', event.which);
                    if(letterCounter == 0 && whichSentence == 0){
                        startTime = new Date().getTime();
                        console.log('start time = '+startTime);
                    }
                    letterCounter++;
                    ybPos = $('#yellow-block').position().left;
                    $('#yellow-block').css('left', ybPos + 17.375);
                    $('#feedback').html('<span class="glyphicon glyphicon-thumbs-up"></span>');
                    
                    if(sentences[whichSentence][letterCounter] === " "){
                        $('#target-letter').html("space");
                    } else {
                        $('#target-letter').html(sentences[whichSentence][letterCounter]);
                    }
                } else if(event.which !== 16){ // don't trigger on shift key
                    errorTicker++;
                    console.log(errorTicker + ' errors so far.');
                    $('#feedback').html('<span class="glyphicon glyphicon-thumbs-down"></span>');
                    errors++;
                }

            } else {
                if(whichSentence < (sentences.length - 1) ){
                    //console.log(words);
                    whichSentence++;
                    letterCounter = 0;
                    $('#flex-container p').html(sentences[whichSentence]);
                    $('#yellow-block').css('left', 13);
                    $('#target-letter').html( sentences[whichSentence][letterCounter]);
                    $('#feedback').html('');
                } else {
                    finishTime = new Date().getTime();
                    console.log('date that time stopped = '+finishTime);
                    totalTime = finishTime - startTime;
                    console.log('total time in milliseconds = '+totalTime);
                    convertToTime(totalTime);

                    let wpmMin = (totalTime / 1000) / 60;
                    let wordsPerMinute = Math.floor(wordCount / wpmMin - 2 * errors);
                    // console.log(wordsPerMinute, wordCount, totalTime, wpmMin, errors);
                    console.log(wordsPerMinute+' words per minute');
                    $('#words-per-minute').html('Your speed was: <br>' + wordsPerMinute + ' words per minute!');
                    $('#log #errors').html(errors+" errors");
                    $('.log-container').removeClass('hide-me');
                }
            }
            //console.log(sentences.length, whichSentence, letterCounter, sentences[whichSentence]);
        }
    });    

    $('#try-again').click(function(){
        resetGame();
    });

    function convertToTime(time){
        let totalSeconds = time / 1000,
            hours = Math.floor((totalSeconds / 60) / 60),
            minutes = Math.floor(totalSeconds / 60),
            seconds = Math.floor(totalSeconds % 60);
            if( seconds.toString().length == 1){
                seconds = '0' + seconds;
            }
            if( minutes.toString().length == 1){
                minutes = '0' + minutes;
            }
        console.log('Time taken to complete is: '+hours+':'+minutes+':'+seconds+'. Total seconds was: '+totalSeconds);
        $('#log #timer').html('Time taken to complete:<br><span>'+hours+':'+minutes+':'+seconds+'</span>'); // get seconds, round to nearest whole number
    }
    function resetGame(){
        whichSentence = 0;
        letterCounter = 0;
        errors = 0;
        errorTicker = 0;
        $('#flex-container p').html(sentences[whichSentence]);
        $('#yellow-block').css('left', 13);
        $('.log-container').addClass('hide-me');
        $('#target-letter').html(sentences[whichSentence][letterCounter]);
        $('#words-per-minute, #errors, #timer, #feedback').html('');
    }
});