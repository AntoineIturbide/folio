var gd = true;
var pr = true;
var er = true;

function FlipGd() {
    gd = !gd;
    RefreshGraphics();
}
function FlipPr() {
    pr = !pr;
    RefreshGraphics();
}
function FlipEr() {
    er = !er;
    RefreshGraphics();
}

function RefreshFiltersGraphics() {
    var gdFilter = document.getElementById("gd_filter");
    var prFilter = document.getElementById("pr_filter");
    var erFilter = document.getElementById("er_filter");
    if (gd) {
        gdFilter.classList.add("selected");
    } else {
        gdFilter.classList.remove("selected");
    }
    if (pr) {
        prFilter.classList.add("selected");
    } else {
        prFilter.classList.remove("selected");
    }
    if (er) {
        erFilter.classList.add("selected");
    } else {
        erFilter.classList.remove("selected");
    }
}

function RefreshVignetteGraphics() {
    var vignettes = document.querySelectorAll('.project_vignette:not(inactive)');
    for (var i = 0; i < vignettes.length; ++i) {
        vignettes[i].classList.add("inactive");
    }

    var querry = "";
    if (gd) querry += ".project_vignette.gd";
    if (pr) {
        if (querry != "") querry += ", ";
        querry += ".project_vignette.pr";
    }
    if (er) {
        if (querry != "") querry += ", ";
        querry += ".project_vignette.er";
    }
    vignettes = document.querySelectorAll(querry);
    for (var i = 0; i < vignettes.length; ++i) {
        vignettes[i].classList.remove("inactive");
    }
}

function RefreshGraphics() {
    RefreshFiltersGraphics();
    RefreshVignetteGraphics();
}

function BindFilterInput() {
    var gdFilter = document.getElementById("gd_filter");
    var prFilter = document.getElementById("pr_filter");
    var erFilter = document.getElementById("er_filter");
    gdFilter.addEventListener("click", FlipGd);
    prFilter.addEventListener("click", FlipPr);
    erFilter.addEventListener("click", FlipEr);
}