app.directive('qpPollForm', function QpPoll(){
  return {
    restrict: 'E',
    templateUrl: 'app/templates/polls/poll_form.html',
    scope: {},
    controller: function(PollsService, Auth){
      var ctrl = this;

      Auth.currentUser().then(function(user) { 
        ctrl.currentUser = user; 
      });

    },
    controllerAs: 'vm',
    bindToController: {poll: '='},
    require: '^qpPollCard',
    link: function(scope, element, attrs, ctrl){
      scope.submitResponse = function(response) {
        ctrl.submitResponse(response);
      }
    }
  }
});