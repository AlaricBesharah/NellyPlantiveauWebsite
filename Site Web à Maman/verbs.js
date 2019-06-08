var present = [
    ["present", "je",   "tu",    "il",   "nous",   "vous",  "ils"],
    ["aimer", "aime", "aimes", "aime", "aimons", "aimez", "aiment"],
    ["aller", "va", "vas", "va", "allons", "allez", "vont"]
];

var imparfait = [
    ["imparfait", "je", "tu",     "il",     "nous",    "vous",   "ils"],
    ["aimer", "aimais", "aimais", "aimait", "aimions", "aimiez", "aimaient"],
    ["aller", "allais", "allais", "allait", "allions", "alliez", "allaient"],
    ["aller", "allais", "allais", "allait", "allions", "alliez", "allaient"]
];

var passéComposé = [
    ["passé Composé", "je", "tu",     "il",     "nous",    "vous",   "ils"],
    ["aimer", "aimais", "aimais", "aimait", "aimions", "aimiez", "aimaient"],
    ["aller", "allais", "allais", "allait", "allions", "alliez", "allaient"],
    ["aller", "allais", "allais", "allait", "allions", "alliez", "allaient"]
];


var verbs103 = [present];
var verbs106 = [present, imparfait,passéComposé];
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



