'use strict';

// Members controller

var membersApp = angular.module('members');

membersApp.controller('MembersController', ['$scope', '$stateParams', 'Authentication', 'Members', '$modal', '$log',
    function($scope, $stateParams, Authentication, Members, $modal, $log) {

        this.authentication = Authentication;

        //Find a list of member 
        this.members = Members.query();

        // Open a modal window to create a single member record
        $scope.animationsEnabled = true;

        this.modalCreate = function(size) {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modules/members/views/create-member.client.view.html',
                controller: function($scope, $modalInstance) {

                    $scope.ok = function() {

                        //                    if ( createMemberForm.$valid){
                        $modalInstance.close();
                        //                    };
                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };


                },
                size: size,
            });

            modalInstance.result.then(function(selectedItem) {}, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        //    }
        //]);

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

        // Remove existing Member
        this.remove = function(member) {
            if (member) {
                member.$remove();

                for (var i in this.members) {
                    if (this.members[i] === member) {
                        this.members.splice(i, 1);
                    }
                }
            } else {
                this.member.$remove(function() {

                });
            }
        };

    }
]);

membersApp.controller('MembersCreateController', ['$scope', 'Members', 'Notify',
    function($scope, Members, Notify) {
        // Create new Member

        $scope.membershipCategory = ['Parent', 'Family', 'Friend', 'Honorary', 'Cadet', 'Graduate'];

        this.create = function() {
            // Create new Member object
            var member = new Members({
                namePrefix: this.namePrefix,
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName,
                nameSuffix: this.nameSuffix,
                email: this.email,
                phoneHome: this.phoneHome,
                phoneMobile: this.phoneMobile,
                street1: this.street1,
                street2: this.street2,
                POBox: this.POBox,
                city: this.city,
                region: this.region,
                postalCode: this.postalCode,
                country: this.country,
                notes: this.notes,
                memberType: this.memberType
            });

            // Redirect after save
            member.$save(function(response) {

                Notify.sendMsg('NewMember', {
                    'id': response._id
                });


            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);

membersApp.controller('MembersUpdateController', ['$scope', 'Members',
    function($scope, Members) {

        $scope.membershipCategory = ['Parent', 'Family', 'Friend', 'Honorary', 'Cadet', 'Graduate'];

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

membersApp.directive('memberList', ['Members', 'Notify', function(Members, Notify) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/members/views/member-list-template.html',
        link: function(scope, elements, attrs) {
            //when a new member is added, update the member list
            Notify.getMsg('NewMember', function(event, data) {
                scope.membersCtrl.members = Members.query();

            });
        }
    };
}]);
