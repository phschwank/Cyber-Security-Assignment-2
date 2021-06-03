// definition of variables
let evaluatedSum;
let maxPoints;
let score;
let numberOfQuestions;
// accordion for "More Information"
let acc = document.getElementsByClassName("accordion");
let accAcc = document.getElementsByClassName("accordionAccordion");
// scroll to top button
toTopbutton = document.getElementById("top-button");
// get element to print the warning
let printWarning = document.getElementById("print-warning")

// function to check assessment of the index page
if (window.location.href.match('index.html') != null) {
    setInterval(function () {
        let nanBool = false;
        numberOfQuestions = document.getElementsByName("question").length;
        let furtherProcedureYes = document.getElementById("further-procedure-yes");
        let furtherProcedureNo = document.getElementById("further-procedure-no");
        evaluatedSum = 0;
        for (let i = 0; i < numberOfQuestions; i++) {
            let selObj = document.getElementById("evaluation" + (i + 1));
            let selValue = parseInt(selObj.options[selObj.selectedIndex].value, 10);
            if (Number.isNaN(selValue)) {
                nanBool = true;
                break;
            } else {
                evaluatedSum = evaluatedSum + selValue;
            }
        }
        if ((evaluatedSum > 0) && (nanBool === false)) {
            furtherProcedureYes.style.display = "block";
            furtherProcedureNo.style.display = "none";
        } else if ((evaluatedSum === 0) && (nanBool === false)) {
            furtherProcedureYes.style.display = "none";
            furtherProcedureNo.style.display = "block";
        } else {
            furtherProcedureYes.style.display = "none";
            furtherProcedureNo.style.display = "none";
        }
    }, 1000);
}

// function to calculate score of each test
function countPoints(checklist) {
    evaluatedSum = 0;
    maxPoints = 0;
    // get number of questions
    numberOfQuestions = document.getElementsByName("question").length;
    // loop through all questions to calculate max score and achieved score
    for (let i = 0; i < numberOfQuestions; i++) {
        let selObj = document.getElementById("evaluation" + (i + 1));
        let selValue = parseInt(selObj.options[selObj.selectedIndex].value, 10);
        // check if there are any questions which are not applicable to reduce the max score
        if (!(selObj.options[selObj.selectedIndex].text.localeCompare("Not applicable") === 0)) {
            maxPoints = maxPoints + 3;
            evaluatedSum = evaluatedSum + selValue;
        }
    }
    // assign the corresponding score box to the achieved score by calling the showScoreBox function
    score = (evaluatedSum / maxPoints) * 100;

    if (Number.isNaN(score)) {
        document.getElementById("nan-text").style.display = "block"
        document.getElementById("score-box").style.display = "block";
        document.getElementById("score-box").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("nan-text").style.display = "none";
        evaluateScoreBox(score, "gold-medal", "gold-text", "silver-medal",
            "silver-text", "bronze-medal", "bronze-text", "warning-sign",
            "warning-text", "score-box");
        // save actual score to local storage (key:value pair)
        sessionStorage.setItem(checklist, score);
        // show print warning
        printWarning.style.display = "block";
        // hide elements from printing
        let accordionToHide = document.getElementsByClassName("accordion");
        let panelToHide = document.getElementsByClassName("panel")
        for(let i = 0; i < accordionToHide.length; i++){
            togglePrintElement(accordionToHide[i]);
        }
        for(let i = 0; i < panelToHide.length; i++){
            togglePrintElement(panelToHide[i]);
        }
    }
}

// function to calculate score of the Pre-Checklist
function countPointsPreChecklist() {
    evaluatedSum = 0;
    // get number of questions
    numberOfQuestions = document.getElementsByName("question").length;
    // elements to change properties later
    let scoreBox = document.getElementById("pre-checklist-box");
    let greenText = document.getElementById("green-text");
    let yellowText = document.getElementById("yellow-text");
    let redText = document.getElementById("red-text");
    let nanText = document.getElementById("nan-text");
    // loop through all questions to calculate achieved score
    for (let i = 0; i < numberOfQuestions; i++) {
        let selObj = document.getElementById("evaluation" + (i + 1));
        let selValue = parseInt(selObj.options[selObj.selectedIndex].value, 10);
        evaluatedSum = evaluatedSum + selValue;
    }
    // get evaluation result
    if (Number.isNaN(evaluatedSum)) {
        scoreBox.style.backgroundColor = "lightcoral";
        scoreBox.style.display = "block";
        greenText.style.display = "none";
        yellowText.style.display = "none";
        redText.style.display = "none";
        nanText.style.display = "block";
    } else if (evaluatedSum > 6) {
        scoreBox.style.backgroundColor = "lightgreen";
        scoreBox.style.display = "block";
        greenText.style.display = "block";
        yellowText.style.display = "none";
        redText.style.display = "none";
        nanText.style.display = "none";
        printWarning.style.display = "block";
    } else if ((evaluatedSum > 3) && (evaluatedSum < 7)) {
        scoreBox.style.backgroundColor = "lightgoldenrodyellow";
        scoreBox.style.display = "block";
        greenText.style.display = "none";
        yellowText.style.display = "block";
        redText.style.display = "none";
        nanText.style.display = "none";
        printWarning.style.display = "block";
    } else {
        scoreBox.style.backgroundColor = "lightcoral";
        scoreBox.style.display = "block";
        greenText.style.display = "none";
        yellowText.style.display = "none";
        redText.style.display = "block";
        nanText.style.display = "none";
        printWarning.style.display = "block";
    }

    // hide elements from printing
    let accordionToHide = document.getElementsByClassName("accordion");
    let panelToHide = document.getElementsByClassName("panel")
    for(let i = 0; i < accordionToHide.length; i++){
        togglePrintElement(accordionToHide[i]);
    }
    for(let i = 0; i < panelToHide.length; i++){
        togglePrintElement(panelToHide[i]);
    }
}

// update overview / result window on load by calling update function
if (window.location.href.match('overview-results.html') != null) {
    updateOverviewResult()
}

// function to update overview / result window
function updateOverviewResult() {
    if ("controllersChecklist" in sessionStorage) {
        evaluateScoreBox(parseInt(sessionStorage.getItem("controllersChecklist")),
            "gold-medal-controllers-checklist", "gold-text-controllers-checklist",
            "silver-medal-controllers-checklist", "silver-text-controllers-checklist",
            "bronze-medal-controllers-checklist", "bronze-text-controllers-checklist",
            "warning-sign-controllers-checklist", "warning-text-controllers-checklist",
            "score-box-controllers-checklist");
    } else {
        document.getElementById("no-controllers-checklist").style.display = "block";
    }

    if ("processorsChecklist" in sessionStorage) {
        evaluateScoreBox(parseInt(sessionStorage.getItem("processorsChecklist")),
            "gold-medal-processors-checklist", "gold-text-processors-checklist",
            "silver-medal-processors-checklist", "silver-text-processors-checklist",
            "bronze-medal-processors-checklist", "bronze-text-processors-checklist",
            "warning-sign-processors-checklist", "warning-text-processors-checklist",
            "score-box-processors-checklist");
    } else {
        document.getElementById("no-processors-checklist").style.display = "block";
    }

    if ("informationChecklist" in sessionStorage) {
        evaluateScoreBox(parseInt(sessionStorage.getItem("informationChecklist")),
            "gold-medal-information-checklist", "gold-text-information-checklist",
            "silver-medal-information-checklist", "silver-text-information-checklist",
            "bronze-medal-information-checklist", "bronze-text-information-checklist",
            "warning-sign-information-checklist", "warning-text-information-checklist",
            "score-box-information-checklist");
    } else {
        document.getElementById("no-information-checklist").style.display = "block";
    }

    if ("dataChecklist" in sessionStorage) {
        evaluateScoreBox(parseInt(sessionStorage.getItem("dataChecklist")),
            "gold-medal-data-checklist", "gold-text-data-checklist",
            "silver-medal-data-checklist", "silver-text-data-checklist",
            "bronze-medal-data-checklist", "bronze-text-data-checklist",
            "warning-sign-data-checklist", "warning-text-data-checklist",
            "score-box-data-checklist");
    } else {
        document.getElementById("no-data-checklist").style.display = "block";
    }

    if ("recordChecklist" in sessionStorage) {
        evaluateScoreBox(parseInt(sessionStorage.getItem("recordChecklist")),
            "gold-medal-record-checklist", "gold-text-record-checklist",
            "silver-medal-record-checklist", "silver-text-record-checklist",
            "bronze-medal-record-checklist", "bronze-text-record-checklist",
            "warning-sign-record-checklist", "warning-text-record-checklist",
            "score-box-record-checklist");
    } else {
        document.getElementById("no-record-checklist").style.display = "block";
    }

    if ("consentChecklist" in sessionStorage) {
        evaluateScoreBox(parseInt(sessionStorage.getItem("consentChecklist")),
            "gold-medal-consent-checklist", "gold-text-consent-checklist",
            "silver-medal-consent-checklist", "silver-text-consent-checklist",
            "bronze-medal-consent-checklist", "bronze-text-consent-checklist",
            "warning-sign-consent-checklist", "warning-text-consent-checklist",
            "score-box-consent-checklist");
    } else {
        document.getElementById("no-consent-checklist").style.display = "block";
    }
}

// function to determine the corresponding score box
function evaluateScoreBox(score, goldMedalId, goldTextId, silverMedalId, silverTextId, bronzeMedalId, bronzeTextId,
                          warningSignId, warningTextId, scoreBoxId) {
    if (score >= 90) {
        showScoreBox(goldMedalId, "block", goldTextId, "block", silverMedalId,
            "none", silverTextId, "none", bronzeMedalId, "none",
            bronzeTextId, "none", warningSignId, "none", warningTextId,
            "none", scoreBoxId, "block", "lightgoldenrodyellow")
    } else if ((score < 90) && (score >= 70)) {
        showScoreBox(goldMedalId, "none", goldTextId, "none", silverMedalId,
            "block", silverTextId, "block", bronzeMedalId, "none",
            bronzeTextId, "none", warningSignId, "none", warningTextId,
            "none", scoreBoxId, "block", "lightblue")
    } else if ((score < 70) && (score >= 50)) {
        showScoreBox(goldMedalId, "none", goldTextId, "none", silverMedalId,
            "none", silverTextId, "none", bronzeMedalId, "block",
            bronzeTextId, "block", warningSignId, "none", warningTextId,
            "none", scoreBoxId, "block", "lightsalmon")
    } else {
        showScoreBox(goldMedalId, "none", goldTextId, "none", silverMedalId,
            "none", silverTextId, "none", bronzeMedalId, "none",
            bronzeTextId, "none", warningSignId, "block", warningTextId,
            "block", scoreBoxId, "block", "lightcoral")
    }
}

// function to show the score box
function showScoreBox(goldMedalId, goldMedalProperty, goldTextId, goldTextProperty, silverMedalId, silverMedalProperty,
                      silverTextId, silverTextProperty, bronzeMedalId, bronzeMedalProperty, bronzeTextId,
                      bronzeTextProperty, warningSignId, warningSignProperty, warningTextId, warningTextProperty,
                      scoreBoxId, scoreBoxProperty, backgroundColor) {
    document.getElementById(goldMedalId).style.display = goldMedalProperty;
    document.getElementById(goldTextId).style.display = goldTextProperty;
    document.getElementById(silverMedalId).style.display = silverMedalProperty;
    document.getElementById(silverTextId).style.display = silverTextProperty;
    document.getElementById(bronzeMedalId).style.display = bronzeMedalProperty;
    document.getElementById(bronzeTextId).style.display = bronzeTextProperty;
    document.getElementById(warningSignId).style.display = warningSignProperty;
    document.getElementById(warningTextId).style.display = warningTextProperty;
    document.getElementById(scoreBoxId).style.backgroundColor = backgroundColor;
    document.getElementById(scoreBoxId).style.display = scoreBoxProperty;
}

// function to show a recommendation box for the user if an important question is not considered by the user
function showRecommendation(elementIndex) {
    let selObj = document.getElementById("evaluation" + elementIndex);
    let recommendationDisplayProperty = document.getElementById("recommendation" + elementIndex);
    // check the selected answer to show recommendation if necessary
    if ((selObj.options[selObj.selectedIndex].text.localeCompare("Not yet implemented or planned") === 0)) {
        recommendationDisplayProperty.style.display = "block";
    } else {
        recommendationDisplayProperty.style.display = "none";
    }
}

// function to show a recommendation box for the user if GDPR is relevant for them (index page)
function showRecommendationGDPR(elementIndex) {
    let selObj = document.getElementById("evaluation" + elementIndex);
    let recommendationDisplayProperty = document.getElementById("information" + elementIndex);
    // check the selected answer to show recommendation if necessary
    if ((selObj.options[selObj.selectedIndex].text.localeCompare("Yes") === 0)) {
        recommendationDisplayProperty.style.display = "block";
    } else {
        recommendationDisplayProperty.style.display = "none";
    }
}

// Top accordion
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// Accordion in accordion
for (let i = 0; i < accAcc.length; i++) {
    accAcc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("activeAccordion");

        /* Toggle between hiding and showing the active panel */
        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}


// when the user scrolls down 20px from the top of the document, show the to top button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTopbutton.style.display = "block";
    } else {
        toTopbutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// resize image on click (toggle "img-resize" class)
function resizeImage(element) {
    element.classList.toggle("img-resize");
}

// function to hide element from printing
function togglePrintElement(element) {
    element.classList.toggle("no-print");
}