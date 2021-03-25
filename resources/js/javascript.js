function singleSelectChangeValue() {
    var sum = 0;
    var max = 0;
    for (var i = 1; i < 7; i++) {
        var selObj = document.getElementById("evaluation" + i);
        var selValue = selObj.options[selObj.selectedIndex].value;
        if (!(selObj.options[selObj.selectedIndex].text.localeCompare("Not Applicable") === 0)) {
            max = max + 2;
            sum = sum + parseInt(selValue, 10);
        }
    }
    document.getElementById("evaluation-sum").value = sum;
    document.getElementById("max-score").value = max;
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
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
