//Mobile Campus Menu
var campusSelect = ".campus-select__list";

function toggleMobileCampusList() {
    $(campusSelect).slideToggle(250);
}

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
        
        toggleViewport();
        
        //toggle menu
        $(".banner__menu").slideToggle(250, function () {
            //blur backgrounds after menu displays
            //$(".notifications, .body, .footer").toggleClass("blur");   
        });                                    
    });
}

var viewportLocked = false;

function toggleViewport() {
    if (viewportLocked == false) {
        lockViewport();
    }
    else {
        unlockViewport();
    }
}

var viewportLockProperty = ", maximum-scale=1.0";

function lockViewport() {
    var content = $("meta[name='viewport']").attr("content");
    content += viewportLockProperty;
    
    $("meta[name='viewport']").attr("content", content);

    viewportLocked = true;
}

function unlockViewport() {
    var content = $("meta[name='viewport']").attr("content");
    content = content.replace(viewportLockProperty, "");

    $("meta[name='viewport']").attr("content", content);

    viewportLocked = false;
}

//Desktop Search
var searchItemClass = ".menu__search";
var searchFieldClass = ".menu__search-field";
var searchIconClass = ".menu__search-icon";

function setupDesktopSearch() {
    //Set trigger
    $(".menu__search-icon").click(function () {
        //Toggle Icon
        $(this).toggleClass("open");
        
        //Hide Menu
        $(menuItemsClass).toggle();
        
        //Toggle Width
        $(searchItemClass).toggleClass("one-tenth").toggleClass("one-whole");
        $(searchIconClass).toggleClass("desk--one-whole").toggleClass("desk--one-tenth");
        
        //Show Search Field
        $(searchFieldClass).toggleClass("show");
    });  
}

var campusSelectStartingHeight = $(".campus-select").height();

function setupDesktopStickyMenu() {
    $(window).scroll(function() {
        //Check that we're at a desktop breakpoint
        //1024 is breakpoint set in grid
        if ($(window).width() >= 1024) {
            var pos = $(window).scrollTop();
            var newHeight = campusSelectStartingHeight - pos;

            //No sense in adjusting to a negative height
            if (newHeight >= 0) {
                //Adjust campus-select Height
                $(".campus-select").height(newHeight);
            }
            else {
                $(".campus-select").height(0);
            }
        }
    });
}