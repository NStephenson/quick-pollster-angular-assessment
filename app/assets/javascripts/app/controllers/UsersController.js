app.controller('UsersController', function UsersController(user, PollsService){
  var ctrl = this;

  ctrl.user = user.data;

  PollsService.getUserPolls(ctrl.user).then(function(polls){
    ctrl.publishedPolls = polls.data;
  });

});

UsersController.$inject = ['user', 'PollsService'];