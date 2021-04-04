const QUESTIONS = 6;

var evaluatedSum;
var maxPoints;

function countPoints() {
    evaluatedSum = 0;
    maxPoints = 0;
    for (var i = 0; i < QUESTIONS; i++) {
        var selObj = document.getElementById("evaluation" + (i+1));
        var selValue = selObj.options[selObj.selectedIndex].value;
        if (!(selObj.options[selObj.selectedIndex].text.localeCompare("Not Applicable") === 0)) {
            maxPoints = maxPoints + 2;
            evaluatedSum = evaluatedSum + parseInt(selValue, 10);
        }
    }
    document.getElementById("evaluation-sum").value = evaluatedSum;
    document.getElementById("max-score").value = maxPoints;
}

var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

/*
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}*/
