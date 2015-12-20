(function() {
    var app = angular.module("githubViewer", ["ngRoute","ui.bootstrap"]);

    app.config(function($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "/main/main.html",
                controller: "MainController"
            })
            .when("/user/:username",
            {
                templateUrl: "/user/user.html",
                controller: "UserController"
            })
            .when("/repo/:username/:reponame",
            {
                templateUrl: "/repo/repo.html",
                controller: "RepoController"
            })
            .otherwise({
                redirectTo: "/main"
            });
    });

}());