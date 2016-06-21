angular
  .module('app', ['ui.router', 'templates', 'Devise'])
  .config(function($stateProvider){
    $stateProvider
    .state('polls', {
      url: '/polls',
      controller: 'PollsController as ctrl',
      templateUrl: 'app/templates/polls-index.html',
      resolve: {
        polls: function(PollsService){
          return PollsService.getPolls()
        }
      }
    })
    .state('user', {
      url: '/user/{id}',
      controller: 'UserController as ctrl',
      templateUrl: 'app/templates/user.html',
      resolve: {
        polls: function(UserService){
          return UserService.getUser()
        }
      }
    });
  });