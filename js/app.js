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
  "$state",
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
  }
  this.destroy = function(){
    this.whole.$delete({id: $stateParams.id})
    $state.go("eventWelcome")
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


function eventNewControllerFunction(EventFactory, $state) {
  this.create = function(){
    Event = new EventFactory(this.event)
    Event.$save().then(event => {
      console.log(event);
      $state.go('eventShow', {id: event.id})
    })
  }
}

function EventUpdateControllerFunction($stateParams, EventFactory, $state){
  const self = this
  //sets placeholder values
  this.event = EventFactory.get({id: $stateParams.id}, function(response){
    self.event = response.event
  })
  //updates after second click
  this.update = function(){
    EventFactory.update({id: $stateParams.id}, self.event).$promise.then(function(response){
      self.event = response.event
      $state.go("eventShow", {id: $stateParams.id})
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
// function userCreate(UserFactory){
//   console.log("HIII");
//   // create users
//
//   let user = window.data
//   console.log(user);
//
//   function createUser(user) {
//     UserFactory.create({
//       name: user.firstName
//     }).$promise.then( () => {
//       console.log(window.data);
//     })
//   }
//
// }

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
