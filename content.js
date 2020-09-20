var textandmorse = {
    'A':".-",
    'B':"-...",
    'C':"-.-.",
    'D':"-..",
    'E':".",
    'F':"..-.",
    'G':"--.",
    'H':"....",
    'I':"..",
    'J':".---",
    'K':"-.-",
    'L':".-..",
    'M':"--",
    'N':"-.",
    'O':"---",
    'P':".--.",
    'Q':"--.-",
    'R':".-.",
    'S':"...",
    'T':"-",
    'U':"..-",
    'V':"...-",
    'W':".--",
    'X':"-..-",
    'Y':"-.--",
    'Z':"--..",
    '1':".----",
    '2':"..---",
    '3':"...--",
    '4':"....-",
    '5':".....",
    '6':"-....",
    '7':"--...",
    '8':"---..",
    '9':"----.",
    '0':"-----",
    '.':".-.-.-",
    ',':"--..--",
    ':':"---...",
    '?':"..--..",
    '\'':".----.",
    '-':"-....-",
    '/':"-..-.",
    '(':"-.--.-",
    ')':"-.--.-",
    '"':".-..-.",
    '@':".--.-.",
    '=':"-...-",
    ';': "-.-.-",
    ' ':"/"
}

function encode() {
    testmorse = document.getElementsByClassName("_3FRCZ copyable-text selectable-text");
    if (testmorse.length == 1) {
        return;
    }
    var dec = testmorse[1].innerText;
    var patt = /[:]morse/;
    if(dec.match(patt)==":morse") {
        var res="";
        var i;
        for(i=0;i<dec.length-6;i++) {
            if (i==0) {
                res += textandmorse[dec[i].toUpperCase()];
            }
            else {
                res += " " + textandmorse[dec[i].toUpperCase()];
            }
        }
        testmorse[1].innerText=res;
    }
}

function checkToggle() {
    try {
        chrome.storage.local.get("toConvert", function(result) {
            if (result["toConvert"]) {
                encode();
            }
        });
    }
    catch(error) {
        // comment following line on production
        console.log("Refresh the current tab to make the morse-for-whatsapp extension functioning.");
        // console.log(error);
    }
}

function setMore(m = 5) {
    setTimeout(() => {
        testmorse = document.getElementsByClassName("_3FRCZ copyable-text selectable-text");
        if (testmorse.length == 1) {
            // console.log("Page completely loaded.");
            var myEncoderPoller = setInterval(checkToggle,100);
            // var myEncoderPoller = setInterval(encodeMorse2,100);
        }
        else {
            // console.log("Checking again if loaded.");
            setMore(5);
        }
    }, m*100);
}

setMore(5);

// adding event handler for decoding when text is highlighted
var morseandtext = {}
for(character in textandmorse)
{
    morseandtext[textandmorse[character]] = character;
}

function decodeMorseCode(morse) {
    // console.log(morse);
    let temp = morse.split(" ")
    let result = ""
    for(letter in temp) {
        if (!morseandtext[temp[letter]]) {
            return null;
        }
        result+=morseandtext[temp[letter]]
    }
    // console.log(result);
    // alert(result);
    return result;
}

function checkMorseCode() {
    chrome.storage.local.get("toConvert", function(result) {
        if (result["toConvert"]) {
            var morse = document.getSelection();
            if (morse != "") {
                var result = decodeMorseCode(morse["anchorNode"]["textContent"].slice(1));
                if (result != null) {
                    morse["anchorNode"]["textContent"] = result.toLowerCase();
                }
            }
        }
    });

}

document.onmouseup = checkMorseCode;