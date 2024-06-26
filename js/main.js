/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */

(function($) {

    "use strict";


    var $window = $(window),
        $toggleButton = $('.menu-toggle'),
        $nav = $('.main-navigation'),
        $topbar = $('.top-bar');

    /*---------------------------------------------------- */
    /* Preloader
    ------------------------------------------------------ */
    $window.load(function() {

        // will first fade out the loading animation 
        $("#loader").fadeOut("slow", function() {

            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");

        });

        domService.renderSkills();
        domService.renderResume();
        domService.renderSocialIcons();
        domService.renderServices();
        domService.renderStatusCount();

    });
    $window.resize(function() {
        if (window.innerWidth > 1024) {
            $nav.css("display", "block");
            $topbar.css("background", "transparent");
            $toggleButton.removeClass("is-clicked");
        } else if (window.innerWidth < 1024) {
            $nav.css("display", "none");
        }

    });

    /*---------------------------------------------------- */
    /* FitText Settings
    ------------------------------------------------------ */
    setTimeout(function() {

        $('#intro h1').fitText(1, {
            minFontSize: '42px',
            maxFontSize: '84px'
        });

    }, 100);


    /*---------------------------------------------------- */
    /* FitVids
    ------------------------------------------------------ */
    $(".fluid-video-wrapper").fitVids();



    /*----------------------------------------------------- */
    /* Alert Boxes
    ------------------------------------------------------- */
    $('.alert-box').on('click', '.close', function() {
        $(this).parent().fadeOut(500);
    });

    /*----------------------------------------------------- */
    /* Animate Skill Section
    ------------------------------------------------------- */

    var skillSection = $("#about");
    skillSection.waypoint({
        handler: function(direction) {
            if (direction === 'down') {
                domService.getSkillBars.forEach(function(item) {
                    item.bar.animate(item.value);
                });
            }
        }
    });


    /*----------------------------------------------------- */
    /* Stat Counter
    ------------------------------------------------------- */
    var statSection = $("#stats"),
        stats = $(".stat-count");

    statSection.waypoint({

        handler: function(direction) {

            if (direction === "down") {

                stats.each(function() {
                    var $this = $(this);

                    $({
                        Counter: 0
                    }).animate({
                        Counter: $this.text()
                    }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function(curValue) {
                            $this.text(Math.ceil(curValue));
                        }
                    });
                });

            }

            // trigger once only
            this.destroy();

        },

        offset: "90%"

    });


    /*---------------------------------------------------- */
    /*	Masonry
    ------------------------------------------------------ */
    var containerProjects = $('#folio-wrapper');

    containerProjects.imagesLoaded(function() {

        containerProjects.masonry({
            itemSelector: '.folio-item',
            resize: true
        });

    });


    /*----------------------------------------------------*/
    /*	Modal Popup
    ------------------------------------------------------*/
    $('.item-wrap a').magnificPopup({

        type: 'inline',
        fixedContentPos: false,
        removalDelay: 300,
        showCloseBtn: false,
        mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    });


    /*-----------------------------------------------------*/
    /* Navigation Menu
    ------------------------------------------------------ */

    // toggle button
    $toggleButton.on('click', function(e) {

        e.preventDefault();
        $toggleButton.toggleClass('is-clicked');

        $nav.slideToggle();
        $toggleButton.hasClass('is-clicked') ? $topbar.css("background", "#000") : $topbar.css("background", "transparent");
    });

    // $nav items
    $nav.find('li a').on("click", function() {
        if ($toggleButton.is(":visible")) { //for small screens
            // update the toggle button 		
            $toggleButton.toggleClass('is-clicked');

            $topbar.css("background", "transparent");

            // fadeout the $navigation panel 
            $nav.fadeOut();
        }

    });


    /*---------------------------------------------------- */
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------ */
    var sections = $("section"),
        navigation_links = $("#main-nav-wrap li a");

    sections.waypoint({

        handler: function(direction) {

            var active_section;

            active_section = $('section#' + this.element.id);

            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },

        offset: '25%'
    });


    /*---------------------------------------------------- */
    /* Smooth Scrolling
    ------------------------------------------------------ */
    $('.smoothscroll').on('click', function(e) {

        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function() {
            window.location.hash = target;
        });

    });


    /*---------------------------------------------------- */
    /*  Placeholder Plugin Settings
    ------------------------------------------------------ */
    $('input, textarea, select').placeholder()


    /*---------------------------------------------------- */
    /*	contact form
    ------------------------------------------------------ */

    /* local validation */
    $('#contactForm').validate({

        /* submit via ajax */
        submitHandler: function(form) {

            var sLoader = $('#submit-loader');
            var $formContext = $(form).context;
            var postData = JSON.stringify({
                name: $formContext.name.value,
                phone: $formContext.phone.value,
                email: $formContext.email.value,
                subject: $formContext.subject.value,
                body: $formContext.body.value
            });

            sLoader.fadeIn();
            dataServices.sendEmail(postData)
                .then(function(msg) {
                    sLoader.fadeOut();
                    $('#message-warning').hide();
                    $('#contactForm').fadeOut();
                    $('#message-success').fadeIn();
                }, function(msg) {
                    sLoader.fadeOut();
                    $('#message-warning').html(msg.responseText || "Something went wrong. Please try again later");
                    $('#message-warning').fadeIn();
                });

        }

    });


    /*----------------------------------------------------- */
    /* Back to top
    ------------------------------------------------------- */
    var pxShow = 300; // height on which the button will show
    var fadeInTime = 400; // how slow/fast you want the button to show
    var fadeOutTime = 400; // how slow/fast you want the button to hide
    var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

    // Show or hide the sticky footer button
    jQuery(window).scroll(function() {

        if (!($("#header-search").hasClass('is-visible'))) {

            if (jQuery(window).scrollTop() >= pxShow) {
                jQuery("#go-top").fadeIn(fadeInTime);
            } else {
                jQuery("#go-top").fadeOut(fadeOutTime);
            }

        }

    });

})(jQuery);