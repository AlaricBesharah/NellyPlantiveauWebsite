
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
            input.className = "checkBoxes";
            input.type = "checkbox";
            input.onchange = function(){loadVerbOptions("106");};

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
            setButtons(verb, "103");

            break;
        case '106':
            var allVerbs = document.getElementsByClassName("checkBoxes");
            var selectedTenses = [];
            for(var i = 0; i < allVerbs.length; i++){
                if(allVerbs[i].checked){selectedTenses.push(i)}
            }
            if(selectedTenses.length > 0){
                showTest();
                var randomeTense = getRandomInt(0,selectedTenses.length); // random selected tense
                console.log("Random number = " + randomeTense);
                var selectedVerb = verbs106[selectedTenses[randomeTense]];
                var verbName = selectedVerb[0][0];
                var index = getRandomInt(1, selectedVerb.length); // random verb in selected tense
                var person = getRandomInt(1,selectedVerb[index].length); 
                var infinitif = selectedVerb[index][0];
                var pronoun = selectedVerb[0][person];
                var verb = selectedVerb[index][person];
                if(startsWithVowel(verb) && person === 1) { pronoun = "j'"; }
                setContent(verbName, infinitif, pronoun, verb);
                setButtons(verb, "106");
            }
            else{
                hideTest();
            }
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

function setButtons(verb, _class){
    document.getElementById("testButton").onclick = function() { 
        submitVerb(verb);
    }
    document.getElementById("answer").addEventListener('keyup', function onEvent(e) {
        if (e.keyCode === 13) {
            submitVerb(verb);
        }
    });
    document.getElementById("resetButton").onclick = function() { 
        loadVerbOptions(_class);
        document.getElementById("answer").focus(); 
    }
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

function hideTest(){
    document.getElementById("answerContainer").style.display = "none";
    document.getElementById("emptyMessage").innerHTML = "Please select at least one verb tense to begin";
    document.getElementById("verbTense").style.display = "none";
    document.getElementById("verbName").style.display = "none";
    document.getElementById("resetButton").style.display = "none";
}

function showTest(){
    document.getElementById("answerContainer").style.display = "flex";
    document.getElementById("emptyMessage").innerHTML = "";
    document.getElementById("verbTense").style.display = "block";
    document.getElementById("verbName").style.display = "block";
    document.getElementById("resetButton").style.display = "block";
}