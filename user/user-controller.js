(function() {

    var app = angular.module("githubViewer");

    var UserController = function($scope, github, $routeParams) {

        var onUserComplete = function(data) {
            $scope.user = data;
            github.getRepos($scope.user)
                .then(onRepos, onError);
        };

        var onRepos = function(data) {
            $scope.repos = data;
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch the data. " + "Status code: " + reason.status + ", Reason: " + reason.statusText;
        };


        $scope.repoSortFilters = { name: { name: 'Name', value: 'name' }, stargazers_count: { name: 'Stars', value: '-stargazers_count' }, language: { name: 'Language', value: '+language' }};
        $scope.repoSortCriteria = $scope.repoSortFilters.stargazers_count;
        $scope.dropdownItemSelected = function (item) {
            $scope.repoSortCriteria = item;
        }

        $scope.username = $routeParams.username;
        github.getUser($scope.username).then(onUserComplete, onError);
    };

    app.controller("UserController", UserController);
}());