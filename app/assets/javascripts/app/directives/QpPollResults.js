app.directive('qpPollResults', function(){

  return {
    restrict: 'E',
    templateUrl: 'app/templates/polls/poll_display.html',
    scope: {},
    controller: function(Auth){
      var ctrl = this;

      Auth.currentUser().then(function(user) { 
        ctrl.currentUser = user; 
      });

    },
    controllerAs: 'vm',
    bindToController: {poll: '='}
  }
});