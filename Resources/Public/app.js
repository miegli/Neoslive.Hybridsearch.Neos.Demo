'use strict';


angular.module('NeosliveHybridSearch', ['hybridsearch', 'ngSanitize']).controller('searchCtrl', ['$scope', '$sce', '$hybridsearch', '$hybridsearchObject', '$hybridsearchResultsObject', function ($scope, $sce, $hybridsearch, $hybridsearchObject, $hybridsearchResultsObject) {

    $scope.result = new $hybridsearchResultsObject();
    $scope.lastActiveTabName = 'all';


    $scope.close = function () {
        $scope.query = '';
    };

    $scope.init = function (firebaseEndpoint, siteNodeName, workspaceName, dimensionHash) {

        var hybridSearch = new $hybridsearch(
            firebaseEndpoint,
            workspaceName,
            dimensionHash,
            siteNodeName
        );

        var mySearch = new $hybridsearchObject(hybridSearch);

        var labels = {

            'neos-demo-chapter': 'Chapter',
            'typo3-neos-nodetypes-headline': 'Pages',
            'neos-demo-homepage': 'Pages',
            'typo3-neos-nodetypes-page': 'Pages',
            'typo3-neos-nodetypes-text': 'Pages',
            'typo3-neos-nodetypes-image': 'Images'

        };

        mySearch.setNodeTypeLabels(labels).setQuery('query', $scope).$bind('result', $scope).$watch(function (data) {
console.log(data);
            $('#NeosliveHybridSearch .carousel').carousel();
        }).run();

    };


}]).directive('item', function ($sce) {


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
                    $scope.html = $sce.trustAsHtml($scope.node.html);
                    return template + 'Nodes/turbonode.html';
                } else {
                    switch ($scope.node.getNodeType()) {

                        case 'neos-demo-chapter':

                            if ($scope.view === 'all') {
                                return template + 'Node.html';
                            } else {
                                return template + 'Nodes/neos-demo-chapter.html';
                            }
                            break;

                        case 'typo3-neos-nodetypes-image':

                            if ($scope.view === 'all') {
                                return template + 'Node.html';
                            } else {
                                return template + 'Nodes/typo3-neos-nodetypes-image.html';
                            }
                            break;

                        default:
                            return template + 'Node.html';
                    }
                }


            };

        }
    };


});