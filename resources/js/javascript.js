const QUESTIONS = 5;

var evaluatedSum;
var maxPoints;
var score;

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

    //document.getElementById("evaluation-sum").value = evaluatedSum;
    //document.getElementById("max-score").value = maxPoints;

    score = (evaluatedSum / maxPoints) * 100;
    var scoreBoxProperty = document.getElementById("score-box");
    var goldMedalProperty = document.getElementById("gold-medal");
    var goldTextProperty = document.getElementById("gold-text");
    var silverMedalProperty = document.getElementById("silver-medal");
    var silverTextProperty = document.getElementById("silver-text");
    var bronzeMedalProperty = document.getElementById("bronze-medal");
    var bronzeTextProperty = document.getElementById("bronze-text");
    var warningProperty = document.getElementById("warning");
    var warningTextProperty = document.getElementById("warning-text");

    scoreBoxProperty.style.display = "block";

    if (score >= 90) {
        scoreBoxProperty.style.backgroundColor = "lightgoldenrodyellow";
        bronzeMedalProperty.style.display = "none";
        bronzeTextProperty.style.display = "none";
        silverMedalProperty.style.display = "none";
        silverTextProperty.style.display = "none";
        warningProperty.style.display = "none";
        warningTextProperty.style.display = "none";
        goldMedalProperty.style.display = "block";
        goldTextProperty.style.display = "block";
    }
    else if ((score < 90) && (score >= 70)) {
        scoreBoxProperty.style.backgroundColor = "lightblue";
        goldMedalProperty.style.display = "none";
        goldTextProperty.style.display = "none";
        bronzeMedalProperty.style.display = "none";
        bronzeTextProperty.style.display = "none";
        warningProperty.style.display = "none";
        warningTextProperty.style.display = "none";
        silverMedalProperty.style.display = "block";
        silverTextProperty.style.display = "block";
    }
    else if ((score < 70) && (score >= 50)) {
        scoreBoxProperty.style.backgroundColor = "lightsalmon";
        goldMedalProperty.style.display = "none";
        goldTextProperty.style.display = "none";
        silverMedalProperty.style.display = "none";
        silverTextProperty.style.display = "none";
        warningProperty.style.display = "none";
        warningTextProperty.style.display = "none";
        bronzeMedalProperty.style.display = "block";
        bronzeTextProperty.style.display = "block";
    }
    else {
        scoreBoxProperty.style.backgroundColor = "lightcoral";
        goldMedalProperty.style.display = "none";
        goldTextProperty.style.display = "none";
        silverMedalProperty.style.display = "none";
        silverTextProperty.style.display = "none";
        bronzeMedalProperty.style.display = "none";
        bronzeTextProperty.style.display = "none";
        warningProperty.style.display = "block";
        warningTextProperty.style.display = "block";
    }
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

//Get the button:
mybutton = document.getElementById("myTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}