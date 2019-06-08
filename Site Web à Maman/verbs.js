
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
    return ("aeiouAEIOU".indexOf(x) != -1); 
}

// This fills the contents of the test zone based on which verbs are selected
// call this function when the page is loaded or when checkboxes are turned on/off
// as well as when the new button is pressed

function loadVerbOptions(page){
    switch(page){
        case '103':
            var index = getRandomInt(1, present.length);
            var infinitif = present[index][0];
            var person = getRandomInt(1,present[0].length);
            var pronoun = present[0][person];
            var verb = present[index][person];
            if(startsWithVowel(verb) && person === 1) { pronoun = "j'"; }
            var test = document.getElementById("verbTest");
            var p = document.createElement("p");
            p.innerHTML = "Present." + infinitif + ". " + pronoun + " " + verb;
            test.appendChild(p);
            break;
        case '106':
            var test = document.getElementById("verbTest");
            var p = document.createElement("p");
            p.innerHTML = "404: Boggesh not found";
            test.appendChild(p);
            break;
        default:
            console.log("Cannot load verbs for this page: " + page);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}