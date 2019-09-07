function createCheckRows(){
    var div = document.createElement("div");
    div.className = "checkRow";

    var bob = document.createElement("input");
    bob.className = "groupCheck";
    bob.type = "checkbox";
    bob.onchange = function(){loadVerbOptions("106");}

    var para = document.createElement("p");
    para.innerHTML = groupList[i][groupList[i].length - 1];
    para.className = "checkTag";

    div.appendChild(bob);
    div.appendChild(para);
    document.getElementById("groupZone").appendChild(div);
}

// needs :
//     - class of input
//     - array with indices for para
//     - where to append 


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

    div.appendChild(input);
    div.appendChild(para);
    document.getElementById(destination).appendChild(div);
}