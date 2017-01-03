app.controller('AuthController', function AuthController($state, Auth){
  var ctrl = this;
 
  ctrl.login = function(){
    Auth.login(ctrl.creds).then(function(){
      $state.go('polls');
    });
  }

  ctrl.signUp = function(){
    console.log(ctrl.creds);
    Auth.register(ctrl.creds).then(function(){
      $state.go('polls');
      console.log(user);
    }, function(error){
      console.log(error);
    });
  }
});

AuthController.$inject = ['$state', 'Auth'];
