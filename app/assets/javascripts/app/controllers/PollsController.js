app.controller('PollsController', function PollsController(polls, $filter, Auth, PollsService, $state){
  var ctrl = this;

  ctrl.filterOptions = ['all', 'responded', 'unresponded'];

  Auth.currentUser().then(function(user) { 
    ctrl.currentUser = user; 
  });

  ctrl.polls = polls.data;

  ctrl.setting = 'all';

  ctrl.search = '';


  ctrl.refilter = function() {
    var statusFilteredPolls = $filter('filterPollByResponseStatus')(ctrl.polls, ctrl.currentUser, ctrl.setting);
    ctrl.filteredPolls = $filter('filter')(statusFilteredPolls, ctrl.search);
  }


  ctrl.refilter();

  // New Poll functions

  ctrl.newPoll = {};
  ctrl.newPoll.poll = {};
  ctrl.newPoll.poll.responses_attributes = [ { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' } ];

  ctrl.createNewPoll = function(){
    PollsService.newPoll(ctrl.newPoll).then(function(poll){
      $state.go('poll', {id: poll.data.id})
    });
  }

});