app.service('PollsService', function PollsService($http){

  this.getPolls = function(){
    return $http.get('/polls.json');
  } 

  this.newPoll = function(poll){
    debugger;
    return $http.post('/polls.json', {poll});
  } 

  this.getPoll = function(id){
    return $http.get('/polls/' + id + '.json');
  }

  this.submitResults = function(id, response){
    return $http.post('/polls/' + id + '/results.json', response);
  }

  this.editPoll = function(id, edit){
    return $http.patch('/polls/' + id + '.json', edit);
  }

  this.deletePoll = function(poll){
    return $http.delete('/polls/' + poll.id + '.json');
  }

  this.getUserPolls = function(user){
    return $http.get('/users/' + user.id + '/polls.json');
  }

});