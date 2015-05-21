/**
 * Created by maximeb on 27/04/15.
 */

    ////////////////////
    //  TEST REST     //
    ////////////////////

module.exports = function($scope, rest, $location) {
    $scope.message = 'This is the REST test page';

    $scope.getUn = {};

    $scope.getTout ={};

    rest.getAll($scope.getTout, "questions");
    rest.getOne($scope.getUn, "questionnaires", 3);


    /*$scope.addToIncluded = function(){
        $scope.selectedIncludedItems=[];
        angular.forEach($scope.selectedDispoItems, function (value) {
            $scope.includedItems.push(value);
            $scope.selectedIncludedItems.push(value);
            $scope.dispoItems.splice($scope.dispoItems.indexOf(value),1);
        });
        $scope.selectedDispoItems=[];
    };*/
};