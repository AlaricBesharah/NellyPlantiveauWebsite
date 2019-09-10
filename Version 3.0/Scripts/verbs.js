var emptyMessage = "Select at least one tense and group to start";
var guessTag = false;

// TODO use guess tag to check if the score or display need to be updated. 

/**
 * Takes a list of verbs and creates all the appropriate html elements
 * and associated behavior required for the test section of that list. 
 * 
 * @param verbList a list of verbs, for now either verbs103 or verbs106
 */
function createVerbOptions(verbList, groupList){

    document.getElementById("answer")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("testButton").click();
        }
    });

    document.getElementById("expandButton").onclick = function(){
        var irreg = document.getElementById("irregZone");
        if(irreg.style.maxHeight === "100px") irreg.style.maxHeight = "300px";
        else irreg.style.maxHeight = "100px";

    }

    for(var i = 0; i < verbList.length; i++){
        createCheckRows("checkBoxes", verbList[i][0][0], "tenseZone");
    }

    for(var i = 0; i < groupList.length; i++){
        if(i === 2){
            createCheckRows("groupCheck", groupList[i][groupList[i].length - 1], "groupZone");
            for(var j = 0; j < groupList[2].length - 1; j++){
                createCheckRows("irregCheck", groupList[2][j], "irregZone");
            }
        }else{
            createCheckRows("groupCheck", groupList[i][groupList[i].length - 1], "groupZone");
        }
    } 
}

/**
 * Helper function that creates a div with a check box and a tag and 
 * appends it to a given location.
 * 
 * @param class_      - what kind of checkbox input it is
 * @param content     - what tag has to go next to the input 
 * @param destination - where the new div has to be appended 
 */
function createCheckRows(class_, content, destination){
    var div = document.createElement("div");
    div.className = "checkRow";

    var check = document.createElement("input");
    check.className = class_;
    check.type = "checkbox";
    check.onchange = function(){loadVerbOptions("106");}

    var para = document.createElement("p");
    para.innerHTML = content;
    para.className = "checkTag";

    div.appendChild(check);
    div.appendChild(para);
    document.getElementById(destination).appendChild(div);
}


/** This fills the contents of the verb quiz based on which verbs are selected
 * call this function when the page is loaded or when checkboxes are turned on/off
 * as well as when the new button is pressed
 * 
 * @param page - A string, handles either '103' or '106', describing which
 * class is being displayed on the page
 * */
function loadVerbOptions(page){
    var chosenIndex;
    var group;
    var verbFromGroup;
    var selectedGroups = []; // list of selected indices 
    var selectedTenses = []; 
    var selectedIrrregs = [];
    var groups = document.getElementsByClassName("groupCheck");
    for(var i = 0; i<groups.length; i++) if(groups[i].checked) selectedGroups.push(i); 
    if(selectedGroups.length > 0){
        var selectedGroupIndex = selectedGroups[getRandomInt(0,selectedGroups.length)];
        var allIrregChecks = document.getElementsByClassName("irregCheck"); 
        for(var j = 0; j < allIrregChecks.length; j++) if(allIrregChecks[j].checked) selectedIrrregs.push(j);
        group = groupList[selectedGroupIndex];
        if(selectedGroupIndex === 2 && selectedIrrregs.length > 0){
            verbFromGroup = group[selectedIrrregs[getRandomInt(0, selectedIrrregs.length)]];
        }
        else{
            verbFromGroup = group[getRandomInt(0, group.length - 1)];
        }
    
    }
    var allVerbs = document.getElementsByClassName("checkBoxes");
    var selectedTenses = [];
    for(var i = 0; i < allVerbs.length; i++) if(allVerbs[i].checked)selectedTenses.push(i);
    if(selectedTenses.length > 0 & selectedGroups.length > 0){
        hideTestZone(false);
        var randomeTense = getRandomInt(0,selectedTenses.length);
        tense_ = verbs106[selectedTenses[randomeTense]]; 
    }else{
        hideTestZone(true);
        return;
    }
    var verbName = tense_[0][0];
    var foundTense;
    for(var i = 1; i<tense_.length;i++){
        if(tense_[i][0] === verbFromGroup){
            foundTense = i;
            break;
        }
    }
    var person = getRandomInt(1, tense_[foundTense].length);
    var infinitif = tense_[foundTense][0];
    var pronoun = tense_[0][person];
    var verb = tense_[foundTense][person];

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










