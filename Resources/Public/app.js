'use strict';


angular.module('NeosliveHybridSearch', ['hybridsearch', 'ngSanitize']).controller('searchCtrl', ['$scope', '$sce', '$hybridsearch', '$hybridsearchObject', '$hybridsearchResultsObject', function ($scope, $sce, $hybridsearch, $hybridsearchObject, $hybridsearchResultsObject) {

    $scope.result = new $hybridsearchResultsObject();
    $scope.lastActiveTabName = 'all';

    $scope.close = function() {
        $scope.query = '';
    };

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


}]).directive('item', function () {


    var template = '/_Resources/Static/Packages/Neoslive.Hybridsearch.Neos.Demo/Templates/';

    return {
        template: '<ng-include src="getTemplateUrl()"/>',
        scope: {
            node: '=data',
            view: '@view'
        },
        restrict: 'E',
        controller: function ($scope) {

            $scope.getTemplateUrl = function () {

                if ($scope.node === undefined) {
                    return template + 'Node.html';
                }

                if ($scope.node.isTurboNode()) {
                    return template + 'Turbonode.html';
                } else {
                    switch ($scope.node.getNodeType()) {

                        // case 'phlu-corporate-contact':
                        //
                        //     if ($scope.view === 'all') {
                        //         return template + '/All/phlu-corporate-contact.html';
                        //     } else {
                        //         return template + '/Group/phlu-corporate-contact.html';
                        //     }

                        default:
                            return template + 'Node.html';
                    }
                }


            };

        }
    };


});