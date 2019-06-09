
var ready = true;
var singleDescription = "Temporary FREN 103 verb practise description.";
var multipleDescription = "Select all verbs tenses below which you want to practise";

// Create the HTML elements for the verb quiz based on 
// which list of verbs you pass as parameters
function createVerbOptions(verbList){

    var desc = document.createElement("p");
    desc.className = "description";

    if(verbList.length > 1){

        desc.innerHTML = multipleDescription;
        document.getElementById("contentContainer").appendChild(desc);

        var checkZone = document.getElementById("checkZone");
        for(var i = 0; i < verbList.length; i++){
            var div = document.createElement("div");
            div.className = "checkRow";

            var input = document.createElement("input");
            input.type = "checkbox";

            var para = document.createElement("p");
            para.innerHTML = verbList[i][0][0];
            para.className = "checkTag";

            div.appendChild(input);
            div.appendChild(para);

            checkZone.appendChild(div);
        }
    } else {
        desc.innerHTML = singleDescription;
        document.getElementById("contentContainer").appendChild(desc);
    }
    
}

// Returns true if first char of a string is a vowel, false otherwise
function startsWithVowel(verb) {
    var x = verb.charAt(0);
    return ("aeéiouAEÉIOU".indexOf(x) != -1); 
}

// This fills the contents of the test zone based on which verbs are selected
// call this function when the page is loaded or when checkboxes are turned on/off
// as well as when the new button is pressed

function loadVerbOptions(page){
    switch(page){
        case '103':
            var index = getRandomInt(1, present.length);
            var person = getRandomInt(1,present[index].length); 
            var infinitif = present[index][0];
            var pronoun = present[0][person];
            var verb = present[index][person];
            if(startsWithVowel(verb) && person === 1) { pronoun = "j'"; }
            setContent("Présent", infinitif, pronoun,verb);
            var button = document.getElementById("testButton");
            document.getElementById("testButton").onclick = function() { 
                submitVerb(verb);
            }
            document.getElementById("answer").addEventListener('keyup', function onEvent(e) {
                if (e.keyCode === 13) {
                    submitVerb(verb);
                }
            });
            document.getElementById("resetButton").onclick = function() { 
                loadVerbOptions("103");
                document.getElementById("answer").focus(); 
            }
            break;
        case '106':
            var test = document.getElementById("verbTest");
            var p = document.createElement("p");
            p.innerHTML = "404: thingamabob not found";
            test.appendChild(p);
            break;
        default:
            console.log("Cannot load verbs for this page: " + page);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// sets all the html of the verbTest section
function setContent(_tense, _infinitif, _pronoun, _verb){
    document.getElementById("ok").style.display = "none";
    document.getElementById("nah").style.display = "none";
    document.getElementById("resetButton").innerHTML = "skip";
    document.getElementById('answer').value = '';
    document.getElementById("verbName").innerHTML = _infinitif;
    document.getElementById("verbTense").innerHTML = _tense;
    document.getElementById("pronoun").innerHTML = _pronoun;
}

function setButtons(){

}

function submitVerb(verb){
    var answer = document.getElementById("answer").value;
    if(answer.toLowerCase() === verb){
        document.getElementById("nah").style.display = "none";
        document.getElementById("ok").style.display = "inline-block";
        document.getElementById("resetButton").innerHTML = "next";
    } else {
        document.getElementById("ok").style.display = "none";
        document.getElementById("nah").style.display = "inline-block";
    }
}