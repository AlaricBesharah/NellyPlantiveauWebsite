/**
 * Hello, this js files handles everything to do with the VERBS..
 * 
 */

var singleDescription = "Temporary FREN 103 verb practise description.";
var multipleDescription = "Select all the verb tenses which you want to include in your practice. Chaning your selection will update the workspace.";
var emptyMessage = "Select at least one verb tense to begin";
var currentVerb;
var guessTag = false;


// TODO use guess tag to check if the score or display need to be updated. 


/**
 * Takes a list of verbs and creates all the appropriate html elements
 * and associated behavior required for the test section of that list. 
 * 
 * @param verbList a list of verbs, for now either verbs103 or verbs106
 */
function createVerbOptions(verbList, groupList){
    var desc = document.createElement("p");
    desc.className = "description";

    // This event listener is added seperately from the buttons
    // otherwise it breaks the score increase. 
    // This could be moved somewhere better in the future if I were more motivated, but it lives here for now. 
    document.getElementById("answer")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("testButton").click();
        }
    });

    if(verbList.length > 1){
        desc.innerHTML = multipleDescription;
        // document.getElementById("checkZone").appendChild(desc);

        // Create a check box for each verb tense
        for(var i = 0; i < verbList.length; i++){
            var div = document.createElement("div");
            div.className = "checkRow";

            var input = document.createElement("input");
            input.className = "checkBoxes";
            input.type = "checkbox";
            input.onchange = function(){loadVerbOptions("106");}

            var para = document.createElement("p");
            para.innerHTML = verbList[i][0][0];
            para.className = "checkTag";

            div.appendChild(input);
            div.appendChild(para);

            document.getElementById("checkZone").appendChild(div);
        }

        for(var i = 0; i < groupList.length; i++){
            console.log(groupList[i]);
            var bob = document.createElement("input");
            bob.className = "groupCheck";
            bob.type = "checkbox";
            document.getElementById("checkZone").appendChild(bob);
        }


    } else {
        desc.innerHTML = singleDescription;
        document.getElementsByClassName("contentContainer").appendChild(desc);
    }
}


/** This fills the contents of the verb quiz based on which verbs are selected
 * call this function when the page is loaded or when checkboxes are turned on/off
 * as well as when the new button is pressed
 * 
 * @param page - A string, handles either '103' or '106', describing which
 * class is being displayed on the page
 * */
function loadVerbOptions(page){
    var selectedVerb;
    
    var allVerbs = document.getElementsByClassName("checkBoxes");
    var selectedTenses = [];
    for(var i = 0; i < allVerbs.length; i++){
        if(allVerbs[i].checked){selectedTenses.push(i)}
    }
    if(selectedTenses.length > 0){
        hideTestZone(false);
        var randomeTense = getRandomInt(0,selectedTenses.length);
        selectedVerb = verbs106[selectedTenses[randomeTense]]; 
    }else{
        hideTestZone(true);
        return;
    }
    
    var verbName = selectedVerb[0][0];
    var index = getRandomInt(1, selectedVerb.length); 
    var person = getRandomInt(1,selectedVerb[index].length); 
    var infinitif = selectedVerb[index][0];
    var pronoun = selectedVerb[0][person];
    var verb = selectedVerb[index][person];
    if(startsWithVowel(verb) && person === 1 && pronoun.charAt(0)!='(') { 
        pronoun = "j'"; 
    }
    setContent(verbName, infinitif, pronoun, verb);
    setButtons(verb, page);
}

function loadScore(){
    if(localStorage.getItem('score') != null){
        document.getElementById('scoreCounter').innerHTML = localStorage.getItem('score');
    }
}


/** 
 * Determines if a string starts with a vowel. Returns true if this 
 * condition is met, false otherwise.
 * 
 * @param _string a string
*/
function startsWithVowel(_string) {
    var x = _string.charAt(0);
    return ("aeéiouAEÉIOU".indexOf(x) != -1); 
}

/**
 * Returns a random integer in a specified range.
 * 
 * @param min minimum value, inclusive
 * @param max maximum value, exclusive
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Helper function to set the values of all elements in the verb test
 * section to default values.  
 */
function setContent(_tense, _infinitif, _pronoun, _verb){
    document.getElementById("ok").style.display = "none";
    document.getElementById("nah").style.display = "none";
    document.getElementById("resetButton").innerHTML = "skip";
    document.getElementById('answer').value = '';
    document.getElementById("verbName").innerHTML = _infinitif;
    document.getElementById("verbTense").innerHTML = _tense;
    document.getElementById("pronoun").innerHTML = _pronoun;
}

/**
 * Sets the behavior of the 'ANSWER' and 'SKIP' buttons as well as the 
 * enter button when in the input text field. The answer button and the 
 * enter key both call the submitVerb(verb) function and the skip button 
 * reloads the verb option.  
 * 
 * @param verb the verb which the answer button and the enter key check for
 * @param _class the class for which the verbs must be reloaded
 */
function setButtons(verb, _class){
    document.getElementById("testButton").onclick = function() { 
        submitVerb(verb);
    }
    
    document.getElementById("resetButton").onclick = function() { 
        loadVerbOptions(_class);
        document.getElementById("answer").focus(); 
    }
}

/**
 * Checks if the value of the answer text input field matches the answer
 * provided. If they do match the success symbol is displayed and the text 
 * on the skip button is switched to 'next'. Otherwise the failure 
 * symbol is displayed. 
 * 
 * @param verb a string, the correct answer against which the answer is compared 
 */
function submitVerb(verb){
    var answer = document.getElementById("answer").value;
    if(answer.toLowerCase() === verb){
        setScore(true);
        document.getElementById("nah").style.display = "none";
        document.getElementById("ok").style.display = "inline-block";
        document.getElementById("resetButton").innerHTML = "next";
    } else {
        setScore(false);
        document.getElementById("ok").style.display = "none";
        document.getElementById("nah").style.display = "inline-block";
    }
}

/**
 * Sets the styling of the test zone. Used when a verb tense is selected 
 * to update what is displayed on the page for the user. 
 * 
 * @param hide boolean, true if the content is to be hidden, false otherwise.
 */
function hideTestZone(hide){
    var _container, _message, _block;
    if(hide){
        _container = 'none';
        _message = emptyMessage;
        _block = 'none';
    }
    else{
        _container = 'flex';
        _message = '';
        _block = 'block';
    }
    document.getElementById("answerContainer").style.display = _container;
    document.getElementById("emptyMessage").innerHTML = _message;
    document.getElementById("verbTense").style.display = _block;
    document.getElementById("verbName").style.display = _block;
    document.getElementById("resetButton").style.display = _block;
    document.getElementById("scoreContainer").style.display = _block;
}

/**
 * Appends a given character to the end of the value of a given 
 * input html element. Used for the extra character buttons to add
 * the char into specified input fields. 
 * 
 * @param c the character to be appended to the existing value
 * @param input ID of the input html element onto which the char is 
 * is to be appended
 */
function appendChar(c, input){
    var DOMElement = document.getElementById(input);
    var answer = DOMElement.value;
    var newString = answer.concat(c);
    DOMElement.value = newString;
    DOMElement.focus();
}

/**
 * 
 * @param answer boolean true if the user was correct 
 */
function setScore(answer){
    
    var score = document.getElementById('scoreCounter');

    // check if score hasn't been initialized and set to 0 if not.
    if(window.localStorage.getItem('score') === null){
        window.localStorage.setItem('score', '0');
    }
    if(answer){
        var currentScore = parseInt(window.localStorage.getItem('score')) + 1;
        window.localStorage.setItem('score', currentScore.toString());
    }else{
        window.localStorage.setItem('score', '0');
    }
    score.innerHTML = window.localStorage.getItem('score');
    if(parseInt(localStorage.getItem('score')) > 0){
        document.getElementById('scoreContainer').style.display = 'block';
    }
}










