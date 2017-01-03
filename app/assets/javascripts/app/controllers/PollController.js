app.controller('PollController', ['poll', 'Auth' function PollController(poll, Auth){
  var ctrl = this;

  Auth.currentUser().then(function(user) { 
    ctrl.currentUser = user; 
  });

  ctrl.poll = poll.data;


}]);

