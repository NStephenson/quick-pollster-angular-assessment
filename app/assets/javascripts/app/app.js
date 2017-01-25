var app = angular.module('app', ['ui.router', 'templates', 'Devise', 'ngMessages']);
  // .config([
  //   "$httpProvider", function($httpProvider) {
  //     $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  //   }
  // ])
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('welcome', {
      url: '/',
      data: { authRejected: true },
      templateUrl: 'app/templates/welcome.html'
    })
    .state('welcome.newPoll', {
      url: 'newpoll',
      controller: 'PollsController as vm',
      templateUrl: 'app/templates/polls/new_poll.html',
      resolve: {
        polls: function($state){
          return {};
        }
      }
    })
    .state('welcome.login',{
      url: 'login',
      controller: 'AuthController as vm',
      templateUrl: 'app/templates/auth/login.html'
    })
    .state('welcome.signUp',{
      url: 'signup',
      controller: 'AuthController as vm',
      templateUrl: 'app/templates/auth/registration.html'
    })
    .state('polls', {
      url: '/polls',
      controller: 'PollsController as vm',
      templateUrl: 'app/templates/polls/polls_index.html',
      data: { authRequired: true },
      resolve: {
        polls: ['PollsService', function(PollsService){
          return PollsService.getPolls();
        }]
      }
    })
    // .state('myPolls', {
    //   url: '/my_polls',
    //   controller: 'UsersController as vm',
    //   templateUrl: 'app/templates/mypolls.html',
    //   data: { authRequired: true },
    //   resolve: {
    //     user: function(UserService){
    //       UserService.getUser
    //     }
    //   }
    // })
    .state('poll', {
      url: '/polls/:id',
      controller: 'PollController as vm',
      templateUrl: 'app/templates/polls/poll_show.html',
      resolve: {
        poll: ['PollsService', '$stateParams', function(PollsService, $stateParams){
          return PollsService.getPoll($stateParams.id);
        }]
      }
    })
    .state('login',{
      url: '/login',
      controller: 'AuthController as vm',
      data: { authRejected: true },
      templateUrl: 'app/templates/auth/login.html'
    })
    .state('signUp',{
      url: '/signup',
      controller: 'AuthController as vm',
      data: { authRejected: true },
      templateUrl: 'app/templates/auth/registration.html'
    })
    .state('newPoll', {
      url: '/newpolls',
      controller: "PollsController as vm",
      resolve: {
        polls: function(){
          return {};
        }
      },
      templateUrl: 'app/templates/polls/new_poll.html'
    })
    .state('user', {
      url: '/user/:id',
      controller: 'UsersController as vm',
      templateUrl: 'app/templates/users/user.html',
      data: { authRequired: true },
      resolve: {
        user: ['UserService', '$stateParams', function(UserService, $stateParams){
          return UserService.getUser($stateParams.id);
        }]
      }
    });
    // .state('user.all', {
    //   url: '/all',
    //   controller: 'UsersController as vm',
    //   templateUrl: 'app/templates/polls/new_poll.html',
    //   resolve: {
    //     polls: function($state){
    //       return {};
    //     }
    //   }
    // });

    $urlRouterProvider.otherwise('/');
  }]);

app.run(['$rootScope', '$state', 'Auth', 
function($rootScope, $state, Auth){

  $rootScope.$on('$stateChangeStart', function(e, to){
    Auth.currentUser().then(function(user){
      if (to.data && to.data.authRejected) {
        e.preventDefault();
        $state.go('polls');
      }
    }, function(error){
      console.log(error);
      if (to.data && to.data.authRequired) {
        e.preventDefault();
        $state.go('login');
      }
    });
  });
  
}]);


