"use strict"
var dataServices = (function() {
    var baseUrl = 'https://jpwebsiteemailer.azurewebsites.net/api/';
    var generateUrl = function(apiRoute) {
            return baseUrl + apiRoute;
        },
        postEmail = function(emailData) {
            var apiRoute = "SendEmail";
            var authKey = 'lFCjHv8uUOQEToHgwO4EMNGrVehTMOL6reha8ayz/51SvceN/zTH3w=='
            var url = generateUrl(apiRoute);
            var deferred = $.Deferred();
            $.ajax({
                    type: "POST",
                    beforeSend: function(request) {
                        request.setRequestHeader("x-functions-key", authKey);
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: url,
                    data: emailData,
                })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise();
        },
        getReputation = function() {
            var deferred = $.Deferred();
            var stackApiUrl = "https://api.stackexchange.com/2.2/users/6128864?site=stackoverflow";
            $.get(stackApiUrl)
                .done(function(data) {
                    deferred.resolve(data.items[0].reputation);
                })
                .fail(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise();
        },
        processStatuses = function(statusCounts) {

            var deferred = $.Deferred(),
                hoursObj = statusCounts.find((x) => x.name === 'Hours'),
                coffeeCupsObj = statusCounts.find((x) => x.name === 'Coffee Cups'),
                stackOverflowObj = statusCounts.find((x) => x.name === 'Stack Overflow Reputations'),
                experience = hardDataService.getTotalExperience().obj,
                experienceDays = 231 * experience.years + 21 * experience.months + experience.days;

            hoursObj.count = 8 * experienceDays;
            coffeeCupsObj.count = 2 * experienceDays;
            getReputation()
                .then(function(reputation) {
                    stackOverflowObj.count = reputation;
                    deferred.resolve(statusCounts);
                }, function(err) {
                    stackOverflowObj.count = 919;
                    deferred.resolve(statusCounts);
                });
            return deferred.promise();
        },
        getStatuses = function() {
            var deferred = $.Deferred();
            $.get('data/dataFile.json')
                .done(function(data) {
                    processStatuses(data.statusCounts)
                        .then(function(statusCounts) {
                            deferred.resolve(statusCounts);
                        });
                })
                .fail(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise();
        };


    return {
        sendEmail: postEmail,
        getReputation: getReputation,
        getStatusCounts: getStatuses
    }

})();