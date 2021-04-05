const QUESTIONS = 3;

var evaluatedSum;
var maxPoints;

function countPoints() {
    evaluatedSum = 0;
    maxPoints = 0;
    for (var i = 0; i < QUESTIONS; i++) {
        var selObj = document.getElementById("evaluation" + (i+1));
        var selValue = parseInt(selObj.options[selObj.selectedIndex].value, 10);
        if (!(selObj.options[selObj.selectedIndex].text.localeCompare("Not applicable") === 0)) {
            maxPoints = maxPoints + 3;
            evaluatedSum = evaluatedSum + selValue;
        }
    }
    document.getElementById("evaluation-sum").value = evaluatedSum;
    document.getElementById("max-score").value = maxPoints;
}

function showRecommendation(elementIndex) {
    var selObj = document.getElementById("evaluation"+elementIndex);
    var recommendationDisplayProperty = document.getElementById("recommendation"+elementIndex);
    if ((selObj.options[selObj.selectedIndex].text.localeCompare("Not yet implemented or planned") === 0)){
        recommendationDisplayProperty.style.display = "block";
    } else
    {
        recommendationDisplayProperty.style.display = "none";
    }
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
