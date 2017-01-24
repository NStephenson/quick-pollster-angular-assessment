app.directive('qpNav', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/templates/nav/navbar.html',
    controller: ['Auth', '$state', '$scope', 
    function(Auth, $state, $scope){
      var ctrl = this;

      $scope.$on('devise:login', function(e, user){
        ctrl.currentUser = user;
      })

      $scope.$on('devise:logout', function(e, user){
        delete ctrl.currentUser;
      })

      // I'd like to only have one of the two listeners active depending if
      // the user is logged in or not

      Auth.currentUser().then(function(user) { 
        ctrl.currentUser = user; 
      }); //probably don't need this anymore

      ctrl.logout = function(){
        Auth.logout().then(function(a,b,c){
          $state.go('welcome.login');
        });
      }

    }],
    controllerAs: 'vm'
  }
});