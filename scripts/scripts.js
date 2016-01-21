(function ( $ ) {
    $(document).ready(function() {
        //Mobile Campus List
        CampusSelect.setup();
        
        //Mobile Menu
        MobileMenu.setup();
        
        //Desktop Search
        DesktopSearch.setup();
        
        //Desktop Sticky Menu
        DesktopStickyMenu.setup();
        
        //Content Search Setup
        ContentSearch.setup();
        
        //Homepage Campus Section
        HomepageCampusSection.setup();
    });
    
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
        setup: function() {
            //Toggle open and close
            $(this.Trigger).click(function () {
                MobileMenu.toggleMenu();
            });
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
    
    /*** DESKTOP SEARCH ***/
    var DesktopSearch = {
        //Properties
        ItemClass: ".menu__search",
        FieldClass: ".menu__search-field",
        SearchField: "#menu-search",
        IconClass: ".menu__search-icon",
        BannerClass: ".banner",
        MenuItemsClass: MobileMenu.ItemsClass,
        
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
    
    /*** CONTENT SEARCH ***/
    var ContentSearch = {
        //Properties
        CssClass: ".search__input",
        
        //Functions
        setup: function() {
            $(this.CssClass).click(function() {
                DesktopSearch.open();
            });
        }
    }
    
    /*** DESKTOP STICKY MENU ***/
    var DesktopStickyMenu = {
        //Properties
        CssClass: DesktopSearch.BannerClass,
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
            //Check that we're at a desktop breakpoint
            //1024 is breakpoint set in grid
            if ($(window).width() >= 1024) {
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
    }

    /*** CAMPUS SECTION ***/
    var HomepageCampusSection = {
        //Properties
        CssClass: ".campus-info__other-list a",
        DetailsClass: ".campus-info__current",
        StartingCampus: "",
        
        //Functions
        setup: function() {
            //Set StartingCampus
            this.StartingCampus = 
                this.DetailsClass + "[data-campus='"+ $(this.DetailsClass).filter(":visible").attr("data-campus") + "']";
            
            //Setup Hover Effect
            $(this.CssClass).hover(
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
        }
    }
}( jQuery ));