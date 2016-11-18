'use strict';


angular.module('NeosliveHybridSearch', ['hybridsearch', 'ngSanitize']).controller('searchCtrl', ['$scope', '$sce', '$hybridsearch', '$hybridsearchObject', '$hybridsearchResultsObject', function ($scope, $sce, $hybridsearch, $hybridsearchObject, $hybridsearchResultsObject) {

    $scope.result = new $hybridsearchResultsObject();
    $scope.lastActiveTabName = 'all';

    $scope.init = function (firebaseEndpoint,siteNodeName, workspaceName, dimensionHash) {

        var hybridSearch = new $hybridsearch(
            firebaseEndpoint,
            workspaceName,
            dimensionHash,
            siteNodeName
        );

        var mySearch = new $hybridsearchObject(hybridSearch);

        mySearch.setQuery('query', $scope).$bind('result',$scope).$watch(function(data) {
            console.log(data.count());
        }).run();

    };


}]);