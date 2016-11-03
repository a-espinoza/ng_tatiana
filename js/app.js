angular
.module("tatiana", [
  "ui.router",
  "ngResource"
])
.config([
  "$stateProvider",
  Router
])
.controller("eventIndexController", [
  "EventFactory",
  "UserFactory",
  eventIndexControllerFunction
])
.controller("EventNewController", [
  "EventFactory",
  "$state",
  eventNewControllerFunction
])
.controller("EventShowController", [
  "EventFactory",
  "$stateParams",
  "UserFactory",
  "$state",
  EventShowControllerFunction
])
.controller("EventUpdateController", [
  "$stateParams",
  "EventFactory",
  EventUpdateControllerFunction
])
.controller("EventWelcomeController", [
  "EventFactory",
  "UserFactory",
  EventWelcomeControllerFunction
])
.controller("UserCreateController", [
  "UserFactory",
  "$state",
  UserCreateControllerFunction
])
.controller("userShowController", [
  "EventFactory",
  "$stateParams",
  "UserFactory",
  "$state",
  userShowControllerFunction
])
.factory("EventFactory", [
  "$resource",
  EventFactoryFunction
])
// .factory("EventCodeFactory", [
//   "$resource",
//   EventCodeFactoryFunction
// ])
.factory("UserFactory", [
  "$resource",
  UserFactoryFunction
])
.controller("EventCheckinController", [
  "EventFactory",
  "$state",
  EventCheckinControllerFunction
])

// Routing
function Router($stateProvider){
  $stateProvider
  .state("eventIndex", {
    url: "/events",
    templateUrl: "js/ng-views/index.html",
    controller: "eventIndexController",
    controllerAs: "vm"
  })
  .state("eventNew", {
    url: "/events/new",
    templateUrl: "js/ng-views/new.html",
    controller: "EventNewController",
    controllerAs: "vm"
  })
  .state("eventShow", {
    url: "/events/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "EventShowController",
    controllerAs: "vm"
  })
  .state("eventUpdate", {
    url: "events/:id/update",
    templateUrl: "js/ng-views/update.html",
    controller: "EventUpdateController",
    controllerAs: "vm"
  })
  .state("eventWelcome", {
    url: "/",
    templateUrl: "js/ng-views/welcome.html",
    controller: "EventWelcomeController",
    controllerAs: "vm"
  })
  .state("eventCheckin", {
    url: "/check-in",
    templateUrl: "js/ng-views/check-in.html",
    controller: "EventCheckinController",
    controllerAs: "vm"
  })
  .state("userCreate", {
    url: '/users',
    templateUrl: 'js/ng-views/new_user.html',
    controller: 'UserCreateController',
    controllerAs: 'vm'
  })
  .state("userShow", {
    url: '/events/:id/users',
    templateUrl: 'js/ng-views/userShow.html',
    controller: 'userShowController',
    controllerAs: 'vm'
  })
}
//fix urls to link to heroku
function EventFactoryFunction($resource) {
  return $resource("http://localhost:3000/events/:id", {id: '@id'}, {
    update: {
      method: "put"
    },
    checkin: {
      method: "get"
    }
  })
}
//
// function EventCodeFactoryFunction($resource) {
//   return $resource("http://localhost:3000/decode/:id", {id: '@id'}, {
//     decode: {
//       method: "get"
//     }
//   })
// }
//fix urls to link to heroku

function UserFactoryFunction($resource) {
  return $resource("http://localhost:3000/users/:id", {}, {
    create: { method: "POST" }
  })
}

function eventIndexControllerFunction(EventFactory, UserFactory){
  this.events = EventFactory.query()
}

function EventShowControllerFunction(EventFactory, $stateParams, UserFactory, $state) {
  this.whole = EventFactory.get({id: $stateParams.id}, function(response){
    this.title = response.event.title
    this.attendances = response.event.attendances
  })
  this.update = function(){
    $state.go('eventUpdate', {id: $stateParams.id})
    console.log("working")
  }
  this.destroy = function(){
    console.log("delete");
  }
  this.show = function(){
    $state.go('eventShow')
    console.log("fix me to redirect to show page event")
  }
}


function EventWelcomeControllerFunction(EventFactory, UserFactory) {
  console.log("welcome");
}

function EventCheckinControllerFunction(EventFactory, $state) {
  const self = this
  this.check = function(){
    EventFactory.query(function(response){
      response.forEach(function(e){
        if(e.code == self.event.code){
        $state.go('userShow', {id: e.id})
        }
      })
    })
  }
}

function EventControllerFunction(EventFactory, $state) {
  const self = this
  this.check = function(){
    EventFactory.query(function(response){
      response.forEach(function(e){
        if(e.code == self.event.code){
        $state.go('userShow', {id: e.id})
        }
      })
    })
  }
}

function eventNewControllerFunction(EventFactory, $state) {
  this.create = function(){
    Event = new EventFactory(this.event)
    Event.$save().then(event => {
      console.log(event);
      $state.go('eventShow', {id: event.id})
    })
  }
}

function EventUpdateControllerFunction($stateParams, EventFactory){
  const self = this
  this.event = EventFactory.get({id: $stateParams.id}, function(response){
    self.event = response.event
  })
  this.update = function(){
    EventFactory.update({id: $stateParams.id}, this.event).$promise.then(function(response){
      self.event = response.event
    })
  }
}

function UserCreateControllerFunction(UserFactory, $state){
  this.hand = function(){
    User = new UserFactory(this.user)
    User.$save().then(user => {
      console.log(user);
      $state.go('eventWelcome')
    })
  }
}

function userShowControllerFunction(EventFactory, $stateParams, UserFactory, $state){
  console.log("user show");
  this.whole = EventFactory.get({id: $stateParams.id}, function(response){
    this.title = response.event.title
    this.attendances = response.event.attendances
  })
  this.event = function(){
    $state.go("eventShow", {id: $stateParams.id})
  }
  this.home = function(){
    $state.go("eventWelcome")
  }
}

function onLinkedInLoad() {
  IN.Event.on(IN, "auth", function(){
    IN.API.Raw("/people/~:(id,firstName,lastName,emailAddress,summary,picture-urls::(original),headline)?format=json").result(onSuccess).error(onError);
    function onSuccess(data, UserFactory) {
      console.log(data);
    }
    function onError(error) {
      console.log(error);
    }
  })
}
