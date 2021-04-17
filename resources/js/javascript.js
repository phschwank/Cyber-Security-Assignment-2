var evaluatedSum;
var maxPoints;
var score;
var numberOfQuestions;

function countPoints() {

    evaluatedSum = 0;
    maxPoints = 0;
    numberOfQuestions = document.getElementsByName("question").length;

    for (var i = 0; i < numberOfQuestions; i++) {
        var selObj = document.getElementById("evaluation" + (i+1));
        var selValue = parseInt(selObj.options[selObj.selectedIndex].value, 10);
        if (!(selObj.options[selObj.selectedIndex].text.localeCompare("Not applicable") === 0)) {
            maxPoints = maxPoints + 3;
            evaluatedSum = evaluatedSum + selValue;
        }
    }

    score = (evaluatedSum / maxPoints) * 100;

    if (score >= 90) {
        showScoreBox("block", "block", "none", "none", "none",
            "none", "none", "none", "lightgoldenrodyellow")
    }
    else if ((score < 90) && (score >= 70)) {
        showScoreBox("none", "none", "block", "block", "none",
            "none", "none", "none", "lightblue")
    }
    else if ((score < 70) && (score >= 50)) {
        showScoreBox("none", "none", "none", "none", "block",
            "block", "none", "none", "lightsalmon")
    }
    else {
        showScoreBox("none", "none", "none", "none", "none",
            "none", "block", "block", "lightcoral")
    }
}

function showScoreBox(goldMedal, goldText, silverMedal, silverText, bronzeMedal, bronzeText, warningSign,
                               warningText, backgroundColor) {
    document.getElementById("gold-medal").style.display = goldMedal;
    document.getElementById("gold-text").style.display = goldText;
    document.getElementById("silver-medal").style.display = silverMedal;
    document.getElementById("silver-text").style.display = silverText;
    document.getElementById("bronze-medal").style.display = bronzeMedal;
    document.getElementById("bronze-text").style.display = bronzeText;
    document.getElementById("warning").style.display = warningSign;
    document.getElementById("warning-text").style.display = warningText;
    document.getElementById("score-box").style.backgroundColor = backgroundColor;
    document.getElementById("score-box").style.display = "block";
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