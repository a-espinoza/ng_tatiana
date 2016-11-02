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
    EventShowControllerFunction
  ])
  .controller("EventWelcomeController", [
    "EventFactory",
    EventWelcomeControllerFunction
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
  .state("eventWelcome", {
    url: "/welcome",
    templateUrl: "js/ng-views/welcome.html",
    controller: "EventWelcomeController",
    controllerAs: "vm"
  })
}

function EventFactoryFunction($resource) {
  return $resource("http://localhost:3000/events/:id")
}

function UserFactoryFunction($resource) {
  return $resource("http://localhost:3000/users/:id")
}

function eventIndexControllerFunction(EventFactory){
  this.events = EventFactory.query()
}

function EventShowControllerFunction(EventFactory, $stateParams, UserFactory) {
  this.whole = EventFactory.get({id: $stateParams.id}, function(response){
    console.log(response)
    this.title = response.event.title
    this.attendances = response.event.attendances
  })
}

function EventWelcomeControllerFunction(EventFactory) {
  console.log('welcome')
}

function eventNewControllerFunction(EventFactory, $state) {
  this.create = function(){
    Event = new EventFactory(this.event)
    Event.$save().then(event => {
      console.log(event);
      $state.go('eventShow', {id: event.id})
    }) //delete maybe
  }
}

// Linkedin API listening and calling

// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {
   IN.Event.on(IN, "auth", getProfileData);
}

// Handle the successful return from the API call
function onSuccess(data) {
   console.log(data);
}

// Handle an error response from the API call
function onError(error) {
   console.log(error);
}

// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
  IN.API.Raw("/people/~:(id,firstName,lastName,emailAddress,summary,picture-urls::(original),headline)?format=json").result(onSuccess).error(onError);
}
