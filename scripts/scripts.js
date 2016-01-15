//Mobile Campus Menu
var campusSelect = ".campus-select__list";

function toggleMobileCampusList() {
    $(campusSelect).slideToggle(250);
}
//
//function showCampusList() {
//    $(campusSelect).show();
//}
//
//function hideCampusList() {
//    $(campusSelect).hide();
//}

//Mobile Menu
var menuClass = ".banner__menu";

/*** MODAL FUNCTIONS ***/
function setupMobileMenu() {
    //Toggle open and close
    $("#nav-icon").click(function () {
        $("#nav-icon").toggleClass("close");
        $(".banner__menu").slideToggle(250);
        
        //$("#modal--fullscreen").toggleClass("show");
        $("body").toggleClass("hide-overflow");
        $(".notifications, .body, .footer").toggleClass("blur");                                          
    });
}

function showMobileMenu() {
    $(menuClass).show();
}

function hideMobileMenu() {
    $(menuClass).hide();
}