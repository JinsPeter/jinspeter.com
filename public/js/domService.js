"use strict"
var domService = (function() {

    var skillBars = [];

    var getTemplatePath = function(name) {
            return 'templates/' + name + '.tpl.html';
        },
        renderOwlCarousal = function() {
            /*---------------------------------------------------- */
            /* Owl Carousel
            ------------------------------------------------------ */
            $("#owl-slider").owlCarousel({
                navigation: false,
                pagination: true,
                itemsCustom: [
                    [0, 1],
                    [700, 2],
                    [960, 3]
                ],
                navigationText: false
            });
        },
        renderProgress = function() {
            $("#skill-section ul.skill-bars li").each(function() {
                var container = $(this).children("div.progress")[0];
                var progressValue = parseInt(container.getAttribute("title"));
                var bar = new ProgressBar.SemiCircle(container, {
                    strokeWidth: 6,
                    easing: 'easeInOut',
                    duration: 2250,
                    color: '#ED6A5A',
                    trailColor: '#eee',
                    trailWidth: 1,
                    svgStyle: null,
                    from: {
                        color: '#ED6A5A'
                    },
                    to: {
                        color: '#FF0077'
                    },
                    step: (state, bar) => {
                        bar.path.setAttribute('stroke', state.color);
                        var value = Math.round(bar.value() * 100);
                        bar.setText(value + '%');
                        bar.text.style.color = state.color;
                    }
                });

                skillBars.push({
                    bar: bar,
                    value: progressValue / 100
                });
            });

        },
        renderSocialMediaIcons = function() {
            var file = getTemplatePath("social");
            $.when($.get(file))
                .done(function(templateData) {
                    $.templates({
                        soctmpl: templateData
                    });
                    var templateHTML = $.render.soctmpl(hardDataService.getSocialUrls)
                    $("#intro .intro-social").html(templateHTML);
                    $("footer .footer-social").html(templateHTML);
                });
        },
        renderSkillSection = function() {
            var file = getTemplatePath("skills");
            $.when($.get(file))
                .done(function(templateData) {
                    $.templates({
                        sktmpl: templateData
                    });
                    $("#skill-section").html($.render.sktmpl(hardDataService.getSkillInfo));
                })
                .always(renderProgress);
        },
        renderExperience = function() {
            var file = getTemplatePath("experience");
            $.when($.get(file))
                .done(function(templateData) {
                    $.templates({
                        extmpl: templateData
                    });
                    $("#resume #experience").html($.render.extmpl(hardDataService.getResumeInfo));
                });
        },
        renderEducation = function() {
            var file = getTemplatePath("education");
            $.when($.get(file))
                .done(function(templateData) {
                    $.templates({
                        extmpl: templateData
                    });
                    $("#resume #education").html($.render.extmpl(hardDataService.getResumeInfo));
                });
        },
        renderResumeIntro = function() {
            var file = getTemplatePath("resume");
            $.when($.get(file))
                .done(function(templateData) {
                    $.templates({
                        cvtmpl: templateData
                    });
                    $("#resume").html($.render.cvtmpl(hardDataService.getResumeInfo));
                    renderExperience();
                    renderEducation();
                });
        },
        renderStatusCounts = function() {
            var file = getTemplatePath("status");
            $.when($.get(file))
                .done(function(templateData) {
                    $.templates({
                        ststmpl: templateData
                    });
                    dataServices.getStatusCounts()
                        .then(function(statusCounts) {
                            $("#stats .stats-list").html($.render.ststmpl(statusCounts));
                        }, function(err) {
                            $("#stats").hide();
                        });

                });
        },
        renderServices = function() {
            var file = getTemplatePath("services");
            $.when($.get(file))
                .done(function(templateData) {
                    $.templates({
                        srvtmpl: templateData
                    });
                    $("#services").html($.render.srvtmpl(hardDataService.getServicesInfo));
                })
                .always(renderOwlCarousal);
        };

    return {
        renderSkills: renderSkillSection,
        renderResume: renderResumeIntro,
        renderSocialIcons: renderSocialMediaIcons,
        renderServices: renderServices,
        renderStatusCount: renderStatusCounts,
        getSkillBars: skillBars
    }

})();