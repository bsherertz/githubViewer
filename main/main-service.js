(function() {
    var github = function($http) {

        var getSearchResults = function (val) {
            return $http.get("https://api.github.com/search/users?q=" + val)
                .then(function (response) {
                    return response.data;
                });
        };

        var getUser = function(username) {
            return $http.get("https://api.github.com/users/" + username)
                .then(function(response) {
                    return response.data;
                });
        };

        var getRepos = function(user) {
            return $http.get(user.repos_url)
                .then(function(response) {
                    return response.data;
                });
        };

        var getRepoDetails = function(username,reponame) {
            // The point of this compared to my solution is that it will give a response when both of these have completed receiving data, if not, it will error out as a whole.
            var repo;
            var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
            
            return $http.get(repoUrl)
                .then(function(response){
                   repo = response.data;
                   return $http.get(repoUrl + "/contributors");
                })
                .then(function(response){
                    repo.contributors = response.data;
                    return repo;
                });
        };
        
        return {
            getUser: getUser,
            getRepos: getRepos,
            getRepoDetails: getRepoDetails,
            getSearchResults: getSearchResults
        };
    };

    var module = angular.module("githubViewer");
    module.factory("github", github);

}());