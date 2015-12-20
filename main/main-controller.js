(function() {

    var app = angular.module("githubViewer");

    var MainController = function ($scope, $http, $interval, $location, limitToFilter) {

        var onError = function (reason) {
            $scope.error = "Could not fetch the data. " + "Status code: " + reason.status + ", Reason: " + reason.statusText;
        };

        $scope.search = function(username) {
            $location.path("/user/" + username);
        };

        // Default values on start of app
        $scope.username = "angular";
        //$scope.typeaheadUsers = github.getSearchResults(onTypeAheadComplete, onError);
        $scope.getTASearch = function (val) {
            return $http.get("https://api.github.com/search/users?q=" + val)
                .then(function (response) {
                    return limitToFilter(response.data.items, 15);
                });
        }
    };

    // use the commented out method for passing in arguments for the function in MainController to make sure your code is still working when minified (ex: $scope renamed to "n" will not work correctly)
    // app.controller("MainController", ["$scope", "$http", MainController]);
    app.controller("MainController", MainController);
}());