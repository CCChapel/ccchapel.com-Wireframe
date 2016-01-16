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
        
        //toggle screen lock
        $("body").toggleClass("hide-overflow");
        $("body").toggleClass("lock-position");   
        
        //toggle menu
        $(".banner__menu").slideToggle(250, function () {
            //blur backgrounds after menu displays
            //$(".notifications, .body, .footer").toggleClass("blur");   
        });                                    
    });
}

function showMobileMenu() {
    $(menuClass).show();
}

function hideMobileMenu() {
    $(menuClass).hide();
}

//Desktop Search
var searchItemClass = ".menu__search";
var searchFieldClass = ".menu__search-field";
var searchIconClass = ".menu__search-icon";

function setupDesktopSearch() {
    //Set trigger
    $(".menu__search-icon").click(function () {
        //Hide Menu
        $(menuItemsClass).toggle();
        
        //Toggle Width
        $(searchItemClass).toggleClass("one-tenth").toggleClass("one-whole");
        $(searchIconClass).toggleClass("desk--one-whole").toggleClass("desk--one-tenth");
        
        //Show Search Field
        $(searchFieldClass).toggleClass("show");
    });  
}

function showSearchField() {
    $(searchFieldClass).show();
}

function hideSearchField() {
    $(searchFieldClass).hide();
}