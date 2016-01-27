"use strict";

(function( CCChapel, $, undefined ) {
//    //Private Property
//    var isHot = true;
//
//    //Public Property
//    skillet.ingredient = "Bacon Strips";
//
//    //Public Method
//    skillet.fry = function() {
//        var oliveOil;
//
//        addItem( "\t\n Butter \n\t" );
//        addItem( oliveOil );
//        console.log( "Frying " + skillet.ingredient );
//    };
//
//    //Private Method
//    function addItem( item ) {
//        if ( item !== undefined ) {
//            console.log( "Adding " + $.trim(item) );
//        }
//    }
    
    //************************************************
    // Private Properties
    //***********************************************/
    var desktopBreakpoint = 1024;
    
    //************************************************
    // Public Properties
    //***********************************************/

    //************************************************
    // Private Methods
    //***********************************************/
    /*** MODAL ***/
    var Modal = {
        //Properties
        CssClass: ".modal",
        TransitionDuration: 250,

        //Functions
        setup: function() {

        },
        toggle: function() {
            $(this.CssClass).fadeToggle(this.TransitionDuration);
            Viewport.toggle();
        },
        open: function() {
            $(this.CssClass).fadeIn(this.TransitionDuration);
            Viewport.lock();
        },
        close: function() {
            $(this.CssClass).fadeOut(this.TransitionDuration);
            Viewport.unlock();
        }
    }

    /*** VIEWPORT ***/
    var Viewport = {
        //Properties
        Locked: false,
        LockProperty: ", maximum-scale=1.0",

        //Functions
        toggle: function() {
            if (this.Locked == false) {
                this.lock();
            }
            else {
                this.unlock();
            }
        },
        lock: function() {
            var content = $("meta[name='viewport']").attr("content");
            content += this.LockProperty;

            $("meta[name='viewport']").attr("content", content);

            this.Locked = true;
        },
        unlock: function() {
            var content = $("meta[name='viewport']").attr("content");
            content = content.replace(this.LockProperty, "");

            $("meta[name='viewport']").attr("content", content);

            this.Locked = false;
        }
    }

    /*** CAMPUS LOCATION MAP ***/
    var CampusLocationMap = {
        //Properties
        ListClass: ".campus-info__icon-list",
        MapClass: ".campus-info__map",
        ButtonClass: "#toggle-campus-map",

        //Functions
        setup: function() {
            $(this.ButtonClass).click(function(e) {
                e.preventDefault();

                if ($(window).width() > 1024) {
                    CampusLocationMap.setSize();
                }

                CampusLocationMap.toggle();
            });
        },
        drawMap: function() {
            
        },
        toggle: function() {
            $(this.ButtonClass).toggleClass("active");
            $(this.ListClass).fadeToggle();
            $(this.MapClass).fadeToggle();
            
            CCChapel.createMap("campus-info__map", {
                markers: CCChapel.CampusLocations,
                center: CCChapel.CampusLocations[0].location,
                fitAllMarkers: true
            });
        },
        setSize: function() {
            //Get Current List Size
            var height = $(this.ListClass).height();
            var width = $(this.ListClass).width();

            $(this.MapClass).height(height);
            $(this.MapClass).width(width);
        }
    }
    
    /** FORM CONTROLS ***/
    var SearchFields = {
        //Properties
        Selector: "input[type='search']",
        Html: '<div class="search-go"><div class="center-vertically"><i class="fa fa-chevron-right"></i></div></div>',

        //Functions
        setup: function() {
            $(this.Selector).each(function() {
                //Make Parent Position Relative for Absolute Positioning
                $(this).parent().css("position", "relative");

                $(this).focus(function() {
                    //Get Horizontal Positioning
                    var horizontalPosition = $(this).position().left + $(this).width();

                    //Add Chevron
                    $(this).after(SearchFields.Html);
                    $(this).parent().find(".search-go").css("left", horizontalPosition);
                })
                    .blur(function() {
                    //Add Chevron
                    $(this).parent().find(".search-go").remove();
                });
            });
        }
    }
    
    /*** DESKTOP SEARCH ***/
    var DesktopSearch = {
        //Properties
        ItemClass: ".menu__search",
        FieldClass: ".menu__search-field",
        SearchField: "#menu-search",
        IconClass: ".menu__search-icon",
        BannerClass: ".banner",
        MenuItemsClass: ".menu__items", //CCChapel.MobileMenu.ItemsClass,

        //Functions
        setup: function() {
            //Icon Click
            $(this.IconClass).click(function () {
                DesktopSearch.toggle();
            });

            //            //Field Loses Focus
            //            $(this.SearchField).focusout(function() {
            //                if (!$(DesktopSearch.IconClass).is(":focus")) {
            //                    console.log( $(DesktopSearch.IconClass).is(":focus") );
            //                    
            //                    DesktopSearch.close(); 
            //                }
            //                else {
            //                    console.log("icon clicked");
            //                }
            //            });
        },
        toggle: function() {
            //Toggle Icon
            $(this.IconClass).toggleClass("open");

            //Toggle Menu
            $(this.MenuItemsClass).toggle();

            //Toggle Width
            $(this.ItemClass).toggleClass("one-tenth").toggleClass("one-whole");
            $(this.IconClass).toggleClass("desk--one-whole").toggleClass("desk--one-tenth");

            //Toggle Banner Height
            $(this.BannerClass).toggleClass("fullHeight");

            //Toggle Search Field
            $(this.FieldClass).toggleClass("show");

            //Toggle Modal
            Modal.toggle();

            //Set focus if visible
            if ($(this.FieldClass).hasClass("show")) {
                $(this.SearchField).focus();
            }
        },
        open: function() {
            //Show Icon
            $(this.IconClass).addClass("open");

            //Show Menu
            $(this.MenuItemsClass).hide();

            //Set Width
            $(this.ItemClass).removeClass("one-tenth").addClass("one-whole");
            $(this.IconClass).removeClass("desk--one-whole").addClass("desk--one-tenth");

            //Set Banner Height
            $(this.BannerClass).addClass("fullHeight");

            //Show Search Field
            $(this.FieldClass).addClass("show");

            //Show Modal
            Modal.open();

            //Set focus
            $(this.SearchField).focus();
        },
        close: function() {
            //Hide Icon
            $(this.IconClass).removeClass("open");

            //Show Menu
            $(this.MenuItemsClass).show();

            //Hide Width
            $(this.ItemClass).addClass("one-tenth").removeClass("one-whole");
            $(this.IconClass).addClass("desk--one-whole").removeClass("desk--one-tenth");

            //Hide Banner Height
            $(this.BannerClass).removeClass("fullHeight");

            //Hide Modal
            Modal.close();

            //Hide Search Field
            $(this.FieldClass).removeClass("show");
        }
    }
    
    /*** DESKTOP STICKY MENU ***/
    var DesktopStickyMenu = {
        //Properties
        CssClass: ".banner",
        StartingHeight: "64px",
        EndingHeight: "41px",
        BodySelector: ".body :first-child",
        BodyStartingPosition: "0",
        HeaderClass: ".header",

        //Functions
        setup: function() {
            //Set Heights
            this.StartingHeight = $(this.CssClass).height();
            this.EndingHeight = Math.round(this.StartingHeight * .64);

            //Set BodyStartingPosition
            //Use :first-child because Notifications may not always be there
            this.BodyStartingPosition = $(this.BodySelector).position().top;

            //Setup Scroll Event
            $(window).scroll(function() {
                DesktopStickyMenu.adjustStickyMenu();
            });

            //Initial Page Check
            $(document).ready(function () {
                //We only care if we're not at the top of the screen
                if ($(window).scrollTop != 0) {
                    DesktopStickyMenu.adjustStickyMenu();
                }
            });
        },
        adjustStickyMenu: function() {
            //Scale Banner
            var bodyOffet = $(this.BodySelector).offset().top;
            var windowPosition = $(window).scrollTop();
            var offset = Math.round(bodyOffet - windowPosition);

            if (offset <= 0) {
                $(this.HeaderClass).addClass("sticky")
            }
            else {
                $(this.HeaderClass).removeClass("sticky");
            }
        }
    }

    /*** CAMPUS SECTION ***/
    var HomepageCampusSection = {
        //Properties
        ListClass: ".campus-info__other-list",
        CampusesClass: ".campus-info__other-list a",
        DetailsClass: ".campus-info__current",
        TitleClass: ".campus-info__other-title",
        StartingCampus: "",

        //Functions
        desktopSetup: function() {
            //Set StartingCampus
            this.StartingCampus = 
                this.DetailsClass + "[data-campus='"+ $(this.DetailsClass).filter(":visible").attr("data-campus") + "']";

            //Setup Hover Effect
            $(this.CampusesClass).hover(
                //Over
                function() {
                    var campus = $(this).attr("data-campus");
                    var selector = HomepageCampusSection.DetailsClass + "[data-campus='" + campus + "']";

                    //Hide All
                    $(HomepageCampusSection.DetailsClass).hide();

                    //Show Hovered One
                    $(selector).show();
                },

                //Out
                function() {
                    //Hide Hovered
                    $(HomepageCampusSection.DetailsClass).hide();

                    //Show Original
                    $(HomepageCampusSection.StartingCampus).show();
                }
            );
        },
        portableSetup: function() {
            $(this.TitleClass).click(function() {
                $(".campus-info__other-list").slideToggle(); 
            });
        }
    }

    /*** CONTENT SEARCH ***/
    var ContentSearch = {
        //Properties
        CssClass: ".search__input",

        //Functions
        desktopSetup: function() {
            $(this.CssClass).click(function() {
                DesktopSearch.open();
            });
        },
        portableSetup: function() {
            $(this.CssClass).click(function() {
                //Open Menu
                MobileMenu.open();

                //Setup Focus
                $(DesktopSearch.SearchField).focus();
            });
        }
    }

    /*** CAMPUS SELECT ***/
    var CampusSelect = {
        //Properties
        CssClass: ".campus-select__list",
        ToggleTrigger: ".campus-select__campus-marker",

        //Functions
        toggleMobileList: function() {
            $(this.CssClass).slideToggle(250);
        },
        setup: function() {
            $(this.ToggleTrigger).click(function() {
                CampusSelect.toggleMobileList();
            });
        }
    }

    /*** MOBILE MENU ***/
    var MobileMenu = {
        //Properties
        MenuClass: ".banner__menu",
        ItemsClass: ".menu__items",
        Trigger: "#nav-icon",

        //Functions
        setup: function() {
            //Toggle open and close
            $(this.Trigger).click(function () {
                MobileMenu.toggleMenu();
            });
        },
        toggleMenu: function () {
            //animate icon
            $(this.Trigger).toggleClass("close");

            //toggle screen lock
            $("body").toggleClass("hide-overflow");
            $("body").toggleClass("lock-position");   

            Modal.toggle();

            //toggle menu
            $(this.MenuClass).slideToggle(250, function () {
                //blur backgrounds after menu displays
                //$(".notifications, .body, .footer").toggleClass("blur");   
            });  
        },
        open: function() {
            //animate icon
            $(this.Trigger).addClass("close");

            //toggle screen lock
            $("body").addClass("hide-overflow");
            $("body").addClass("lock-position");   

            Modal.open();

            //toggle menu
            $(this.MenuClass).slideDown(250, function () {
                //blur backgrounds after menu displays
                //$(".notifications, .body, .footer").toggleClass("blur");   
            });  
        },
        close: function() {
            //animate icon
            $(this.Trigger).removeClass("close");

            //toggle screen lock
            $("body").removeClass("hide-overflow");
            $("body").removeClass("lock-position");   

            Modal.close();

            //toggle menu
            $(this.MenuClass).slideUp(250, function () {
                //blur backgrounds after menu displays
                //$(".notifications, .body, .footer").toggleClass("blur");   
            });  
        }
    }

    //************************************************
    // Public Methods
    //***********************************************/
    CCChapel.initialize = function() {
        CampusLocationMap.setup();
        SearchFields.setup();
        
        //DESKTOP FUNCTIONS
        if ($(window).width() >= desktopBreakpoint) {
            //Desktop Search
            DesktopSearch.setup();

            //Desktop Sticky Menu
            DesktopStickyMenu.setup();

            //Homepage Campus Section
            HomepageCampusSection.desktopSetup();

            //Content Search Setup
            ContentSearch.desktopSetup();
        }
        
        //PORTABLE FUNCTIONS
        if ($(window).width() < desktopBreakpoint) {
            //Mobile Campus List
            CampusSelect.setup();

            //Mobile Menu
            MobileMenu.setup();

            //Homepage Campus Section
            HomepageCampusSection.portableSetup();

            //Content Search Setup
            ContentSearch.portableSetup();
        }
    };
}( window.CCChapel = window.CCChapel || {}, jQuery ));

//MAPS
(function( CCChapel, $, undefined ) {
    //************************************************
    // Public Properties
    //***********************************************/
    CCChapel.CampusLocations = [
        {
            name: 'Christ Community Chapel &ndash; Hudson Campus',
            location: { lat: 41.231812, lng: -81.485023 },
            info: createMapInfo(
                "Christ Community Chapel &ndash; Hudson Campus",
                "750 W Streetsboro Street | Hudson, Ohio",
                "https://www.google.com/maps/dir//Christ+Community+Chapel+-+Hudson+Campus,+750+W+Streetsboro+St,+Hudson,+OH+44236,+United+States/@41.231745,-81.4859318,17z/data=!4m12!1m3!3m2!1s0x883120ef6e7919cd:0x308c6f24f427b843!2sChrist+Community+Chapel+-+Hudson+Campus!4m7!1m0!1m5!1m1!1s0x883120ef6e7919cd:0x308c6f24f427b843!2m2!1d-81.4837431!2d41.231745")
        },
        {
            name: 'Christ Community Chapel &ndash; Aurora Campus',
            location: { lat: 41.323287, lng: -81.345287 },
            info: createMapInfo(
                "Christ Community Chapel &ndash; Aurora Campus",
                "252 N Chillicothe Road | Aurora, Ohio",
                "https://www.google.com/maps/dir//Christ+Community+Chapel+-+Aurora+Campus,+252+N+Chillicothe+Rd,+Aurora,+OH+44202,+United+States/@41.3240885,-81.3459627,17z/data=!4m12!1m3!3m2!1s0x883119d734fb37c5:0xb499c4ffae160675!2sChrist+Community+Chapel+-+Aurora+Campus!4m7!1m0!1m5!1m1!1s0x883119d734fb37c5:0xb499c4ffae160675!2m2!1d-81.343774!2d41.3240885")
        },
        {
            name: 'Christ Community Chapel &ndash; Stow Campus',
            location: { lat: 41.158564, lng: -81.42059 },
            info: createMapInfo(
                "Christ Community Chapel &ndash; Stow Campus",
                "3900 Kent Road | Stow, Ohio",
                "https://www.google.com/maps/dir//Christ+Community+Chapel+-+Stow+Campus,+3900+Kent+Rd,+Stow,+OH+44224,+United+States/@41.1572009,-81.4232236,17z/data=!4m12!1m3!3m2!1s0x883125d3a382d885:0xc0fd9e409b822ec7!2sChrist+Community+Chapel+-+Stow+Campus!4m7!1m0!1m5!1m1!1s0x883125d3a382d885:0xc0fd9e409b822ec7!2m2!1d-81.4210349!2d41.1572009")
        },
        {
            name: 'Christ Community Chapel &ndash; Highland Square Campus',
            location: { lat: 41.095619, lng: -81.544334 },
            info: createMapInfo(
                "Christ Community Chapel &ndash; Highland Square Campus",
                "<div class='accent'>Meeting at Portage Path Community Learning Center</div> 55 S Portage Path | Akron, Ohio",
                "https://www.google.com/maps/dir//Portage+Path+CLC+Elementary+School,+55+S+Portage+Path,+Akron,+OH+44303/@41.0955219,-81.5465821,17z/data=!4m12!1m3!3m2!1s0x8830d7b3e1a79a8d:0x436ee5a6712ac32c!2sPortage+Path+CLC+Elementary+School!4m7!1m0!1m5!1m1!1s0x8830d7b3e1a79a8d:0x436ee5a6712ac32c!2m2!1d-81.5443934!2d41.0955219")
        }
    ];
    
    /************************************************
    // Private Properties
    //***********************************************/
    var map;

    //Marker Icon Options
    var markerIcon = {
        url: "./images/icons/maps/google-map-icon.png",
        size: new google.maps.Size(75, 75)
    };
    
    /************************************************
    // Public Methods
    //***********************************************/
    CCChapel.createMap = function(elementID, options) {
        //Setup Defaults
        var defaults = {
            markers: CCChapel.CampusLocations,
            fitAllMarkers: false,
            center: CCChapel.CampusLocations[0].location,
            zoom: 11,
            minZoom: 11,
            maxZoom: 11
        };
        
        options = $.extend({}, defaults, options);
        
        //Create Map
        map = new google.maps.Map(document.getElementById(elementID), {
            center: options.center,
            zoom: options.zoom
        });
        
        //Create Info Window
        var infoWindow = new google.maps.InfoWindow({
            content: "Loading..."
        });

        //Create Viewpoint Bound
        var bounds = new google.maps.LatLngBounds();
        
        //Create Markers and Click Event
        for (var i = 0; i < options.markers.length; i++) {
            var marker = new MarkerWithLabel({
                position: options.markers[i].location,
                draggable: false,
                map: map,
                icon: markerIcon,
                labelContent: options.markers[i].name,
                labelAnchor: new google.maps.Point(-40, 75),
                labelClass: "google-map__label",
                animation: google.maps.Animation.DROP
            });

            //Add click event for InfoWindow
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    //Load proper information for clicked campus
                    infoWindow.setContent(options.markers[i].info);

                    //Open Info Window
                    infoWindow.open(map, marker);
                }
            })(marker, i));

            //Extend bounds
            bounds.extend(
                new google.maps.LatLng(
                    options.markers[i].location.lat, 
                    options.markers[i].location.lng)
            );
        }

        //Check to fit to bounds
        if (options.fitAllMarkers === true) {
            //Fit bounds to map
            map.fitBounds(bounds);
        }
        
        //Check Zoom
        if (map.getZoom() > options.maxZoom) {
            console.log("set zoom");
            map.setZoom(options.maxZoom);
        }
        else if (map.getZoom() < options.minZoom) {
            console.log("set zoom");
            map.setZoom(options.minZoom);
        }
    }
    
//    CCChapel.getUserLocation = function(pos) {
////        var pos = {
////            lat: 0,
////            lng: 0
////        };
//        
//        if (navigator.geolocation) {
//            navigator.geolocation.getCurrentPosition(function(position) {
//                pos.lat = position.coords.latitude;
//                pos.lng = position.coords.longitude;
////                pos = {
////                    lat: position.coords.latitude,
////                    lng: position.coords.longitude
////                };
//                
//                console.log(pos.lat);
//                console.log(pos.lng);
//                //map.setCenter(pos);
//                
//            });
//        } 
//        else {
//            // Browser doesn't support Geolocation
//            //handleLocationError(false, infoWindow, map.getCenter());
//        }
//    }
//    
    //************************************************
    // Private Methods
    //***********************************************/
    function createMapInfo(name, address, link) {
        return '<div class="google-map__info-window">' +
                    '<div class="google-map__location-name">' + name + '</div>' +
                    '<div class="google-map__location-address">' + address + '</div>' +
                    '<div><a class="cta" href="' + link + '" target="_blank">Get Directions</a></div>' +
               '</div>';
    }
}( window.CCChapel = window.CCChapel || {}, jQuery ));

//(function( CCChapel, $, undefined ) {
//    CCChapel.test = function() {
//        alert("hi");
//    }
//}( window.CCChapel = window.CCChapel || {}, jQuery ));

$(document).ready( function() {
    CCChapel.initialize();
//    CCChapel.test();
})
