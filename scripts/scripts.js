//Mobile Campus Menu
var campusSelect = ".campus-select__list";

function toggleMobileCampusList() {
    $(campusSelect).slideToggle(250);
    console.log("toggled");
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
        
        //Toggle Banner Height
        $(bannerClass).toggleClass("fullHeight");
        
        //Show Search Field
        $(searchFieldClass).toggleClass("show");
    });  
}

//Desktop Sticky Menu
var campusSelectStartingHeight = $(".campus-select").height();
var bannerClass = ".banner";
var bannerStartingHeight = $(bannerClass).height();
var bannerEndingHeight = bannerStartingHeight / 2;
var bodyStartingPosition = $(".body :first-child").position().top;

function setupDesktopStickyMenu() {
    //Setup Scroll Event
    $(window).scroll(function() {
        adjustDesktopStickyMenu();
    });
    
    //Initial Page Check
    $(document).ready(function () {
        //We only care if we're not at the top of the screen
        if ($(window).scrollTop != 0) {
            adjustDesktopStickyMenu();
        }
    });
}

function adjustDesktopStickyMenu() {
    //Check that we're at a desktop breakpoint
    //1024 is breakpoint set in grid
    if ($(window).width() >= 1024) {
        //Scale Banner
        var bodyOffet = $(".body :first-child").offset().top;
        var windowPosition = $(window).scrollTop();
        var offset = Math.round(bodyOffet - windowPosition);

        if (offset <= 0) {
            $(".header").addClass("sticky")
        }
        else {
            $(".header").removeClass("sticky");
        }
    }
}