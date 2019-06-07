// Add event listener to all collapsible divs

var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    var items = content.getElementsByClassName("tabcontent");
    var links = content.getElementsByClassName("tablinks");
    for(var j = 1; j<items.length;j++){
      items[j].style.display = "none";
      links[j].className = links[j].className.replace(" active", "");
    }
    items[0].style.display = "block";
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// var present = [
//   ["verbe", "je",   "tu",    "il",   "nous",   "vous",  "ils"],

//   ["aimer", "aime", "aimes", "aime", "aimons", "aimez", "aiment"],
//   ["aller", "va", "vas", "va", "allons", "allez", "vont"],
//   ["aimer", "aime", "aimes", "aime", "aimons", "aimez", "aiment"]
// ];

console.log(verbs[1]);

function openTab(evt, cityName, node) {
  
  var i;
  var tabcontent = node.parentNode.parentNode.getElementsByClassName("tabcontent");
  var tablinks = node.parentNode.parentNode.getElementsByClassName("tablinks");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
