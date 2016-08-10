app.directive('qpPollCard', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/templates/polls/poll_card.html',
    scope: {},
    controller: function(PollsService, Auth, $scope){
      var ctrl = this;

      ctrl.isAvailable = true;

      ctrl.checkResponded = function(){
        ctrl.currentUser.votes.forEach(function(vote){
          if (vote.poll.id === ctrl.poll.id) {
            ctrl.isAvailable = false;
          }
        })
      }

      Auth.currentUser().then(function(user) { 
        ctrl.currentUser = user; 
        ctrl.checkResponded();
      });

      ctrl.deletePoll = function(){
        PollsService.deletePoll(ctrl.poll);
      }

      ctrl.showEdit = false;

      ctrl.toggleEdit = function(){
        // add function to clear any input
        if (ctrl.showEdit === false) {
          ctrl.showEdit = true;
        } else if(ctrl.showEdit === true){
          ctrl.showEdit = false;
        }
        // add logic to set the setting to whatever is actually saved
      }

      ctrl.submitEdit = function(){
        PollsService.editPoll(ctrl.poll.id, ctrl.poll);
        ctrl.toggleEdit();
      }

      ctrl.applyResponse = function(selected){ 
        if (typeof selected.response.id != 'string') {
          $.each(selected.response.id, function(selectedResponseId){
            ctrl.poll.responses.forEach(function(response){
              if (response.id == selectedResponseId) {
                response.selected++
              }
            });
          });
        } else {
          ctrl.poll.responses.forEach(function(response){
            if (response.id == selected.response.id) {
              response.selected++
            }
          });
        }
      }

      ctrl.submitResponse = function(selected){
        ctrl.applyResponse(selected);
        PollsService.submitResults(ctrl.poll.id, selected).then(function(a,b,c){
          debugger;
          ctrl.isAvailable = false;
        });
      }  

      ctrl.test = function(){
        console.log();
      }

    },
    controllerAs: 'vm',
    bindToController: {poll: '='}
  }
})