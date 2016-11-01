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
    "$stateParams",
    eventNewControllerFunction
  ])
  .controller("EventShowController", [
    "EventFactory",
    "$stateParams",
    "UserFactory",
    EventShowControllerFunction
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
  this.event = EventFactory.get({id: $stateParams.id}).$promise.then(function(response){
    console.log(response.attendances);
  })
}

function eventNewControllerFunction(EventFactory) {
  this.create = function(){
    Event = new EventFactory(this.event)
    Event.$save()
}
  }
  // this.create = function() {
  //   console.log(this.event);
  //   $.ajax({
  //     url: 'http://localhost:3000/events',
  //     type: "post",
  //     dataType: "json",
  //     data: {
  //       event: {
  //         title: this.event.title
  //       }
  //     }
  //   }).done((response) => {
  //     console.log(response)
  //     this.event.$save()
  //   }).fail(() => {
  //     console.log("Ajax request fails!")
  //   }).always(() => {
  //     console.log("This always happens regardless of successful ajax request or not.")
  //   })
  // }


// ajax to call our rails API
// $.ajax({
//   url: 'http://localhost:3000/events.json',
//   type: "get",
//   dataType: "json",
// }).done((response) => {
//   console.log(response)
// }).fail(() => {
//   console.log("Ajax request fails!")
// }).always(() => {
//   console.log("This always happens regardless of successful ajax request or not.")
// })

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
