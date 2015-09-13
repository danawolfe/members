'use strict';

// Members controller

var membersApp = angular.module('members');

membersApp.controller('MembersController', ['$scope', '$stateParams', 'Authentication', 'Members', '$modal', '$log',
    function($scope, $stateParams, Authentication, Members, $modal, $log) {

        this.authentication = Authentication;

        //Find a list of member 
        this.members = Members.query();


        // Open a modal window to update a single member record
        $scope.animationsEnabled = true;

        this.modalUpdate = function(size, selectedMember) {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modules/members/views/edit-member.client.view.html',
                controller: function($scope, $modalInstance, member) {
                    $scope.member = member;

                    $scope.ok = function() {

                        //                        if ( updateMemberForm.$valid){
                        $modalInstance.close($scope.member);
                        //                        }

                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };


                },
                size: size,
                resolve: {
                    member: function() {
                        return selectedMember;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
]);

membersApp.controller('MembersCreateController', ['$scope', 'Members',
    function($scope, Members) {

    }
]);

membersApp.controller('MembersUpdateController', ['$scope', 'Members',
    function($scope, Members) {
        // Update existing Member
        this.update = function(updatedMember) {
            var member = updatedMember;




            member.$update(function() {

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);

membersApp.directive('memberList', [function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/members/views/member-list-template.html',
        link: function(scope, elements, attrs) {

        }
    };
}]);


//  // Create new Member
//  $scope.create = function() {
//      // Create new Member object
//      var member = new Members ({
//          namePrefix: this.namePrefix,
//          firstName: this.firstName,
//          middleName: this.middleName,
//          lastName: this.lastName,
//          nameSuffix: this.nameSuffix,
//          email: this.email,
//          phoneHome: this.phoneHome,
//          phoneMobile: this.phoneMobile,
//          street1: this.street1,
//          street2: this.street2,
//          POBox: this.POBox,
//          city: this.city,
//          region: this.region,
//          postalCode: this.postalCode,
//          country: this.country,
//          notes: this.notes,
//          memberType: this.memberType
//      });

//      // Redirect after save
//      member.$save(function(response) {
//          $location.path('members/' + response._id);

//          // Clear form fields
//          $scope.namePrefix = '';
//          $scope.firstName = '';
//          $scope.middleName = '';
//          $scope.lastName = '';
//          $scope.nameSuffix = '';
//          $scope.email = '';
//          $scope.phoneHome = '';
//          $scope.phoneMobile = '';
//          $scope.street1 = '';
//          $scope.street2 = '';
//          $scope.POBox = '';
//          $scope.city = '';
//          $scope.region = '';
//          $scope.postalCode = '';
//          $scope.country = '';
//          $scope.notes = '';
//          $scope.memberType = '';
//      }, function(errorResponse) {
//          $scope.error = errorResponse.data.message;
//      });
//  };

//  // Remove existing Member
//  $scope.remove = function(member) {
//      if ( member ) { 
//          member.$remove();

//          for (var i in $scope.members) {
//              if ($scope.members [i] === member) {
//                  $scope.members.splice(i, 1);
//              }
//          }
//      } else {
//          $scope.member.$remove(function() {
//              $location.path('members');
//          });
//      }
//  };

//  // Update existing Member
//  $scope.update = function() {
//      var member = $scope.member;

//      member.$update(function() {
//          $location.path('members/' + member._id);
//      }, function(errorResponse) {
//          $scope.error = errorResponse.data.message;
//      });
//  };


//  // Find existing Member
//  $scope.findOne = function() {
//      $scope.member = Members.get({ 
//          memberId: $stateParams.memberId
//      });
//  };
// }
