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
  UserCreateControllerFunction
])
.factory("EventFactory", [
  "$resource",
  EventFactoryFunction
])
.factory("UserFactory", [
  "$resource",
  UserFactoryFunction
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
  .state("userCreate", {
    url: '/users/:id',
    templateUrl: 'js/ng-view/new_user.html',
    controller: 'UserCreateController',
    controllerAs: 'vm'
  })
}

function EventFactoryFunction($resource) {
  return $resource("http://localhost:3000/events/:id", {}, {
    update: { method: "put" }
  })
}

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
    console.log("delete");
  }
}


function EventWelcomeControllerFunction(EventFactory, UserFactory) {
  console.log("welcome");

}

function eventNewControllerFunction(EventFactory, $state) {
  this.create = function(){
    Event = new EventFactory(this.event)
    Event.$save().then(event => {
      console.log(event);
      $state.go('eventShow', {id: event.id})
    })
  }

  function EventUpdateControllerFunction($stateParams, EventFactory){
    const self = this
    this.event = EventFactory.get({id: $stateParams.id}, function(response){
      self.event = response.event
    })
    this.update = function(){
      EventFactory.update({id: $stateParams.id}, this.event).$promise.then(function(response){
        self.event = response.event
      }
    )
  }
}

function UserCreateControllerFunction(){
  this.create = function(){
    User = new UserFactory(this.user)
    User.$save().then(user => {
      console.log(user);
      $state.go('eventWelcome', {id: event.id})
    })
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
    });
  }
