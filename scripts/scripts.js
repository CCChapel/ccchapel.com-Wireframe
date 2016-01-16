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
var menuItemsClass = ".menu__items";

function setupMobileMenu() {
    //Toggle open and close
    $("#nav-icon").click(function () {
        //animate icon
        $("#nav-icon").toggleClass("close");
        
        //toggle menu
        $(".banner__menu").slideToggle(250, function () {
            //blur backgrounds after menu displays
            $(".notifications, .body, .footer").toggleClass("blur");   
        });
        
        //toggle screen lock
        $("body").toggleClass("hide-overflow");
        $("body").toggleClass("lock-position");                                       
    });
}

function showMobileMenu() {
    $(menuClass).show();
}

function hideMobileMenu() {
    $(menuClass).hide();
}

//Desktop Search
var searchItem = ".menu__search";
var searchFieldClass = ".menu__search-field";

function setupDesktopSearch() {
    //Set trigger
    $(".menu__search-icon").click(function () {
        //Hide Menu
        $(menuItemsClass).hide();
        
        //Toggle Width
        $(searchItem).toggleClass("one-whole");
        
        //Show Search Field
        showSearchField();
    });  
}

function showSearchField() {
    $(searchFieldClass).show();
}

function hideSearchField() {
    $(searchFieldClass).hide();
}