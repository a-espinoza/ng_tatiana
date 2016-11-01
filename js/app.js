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
    eventNewControllerFunction
  ])
  .controller("EventShowController", [
    "EventFactory",
    "$stateParams",
    EventShowControllerFunction
  ])
  .factory("EventFactory", [
    "$resource",
    EventFactoryFunction
  ])

// Routing
function Router($stateProvider){
  console.log("router works!");
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
  return $resource("http://localhost:9000/events/:id")
}

function eventIndexControllerFunction(EventFactory){
  console.log("index");
  this.events = EventFactory.query()
}

function eventNewControllerFunction(EventFactory) {
  console.log('add new controller function here');
}

function EventShowControllerFunction(EventFactory, $stateParams) {
  this.event = EventFactory.get({id: $stateParams.id})
}

function eventNewControllerFunction(EventFactory) {
  this.event = new EventFactory()
  this.create = function() {
    console.log(this.event);
    $.ajax({
      url: 'http://localhost:3000/events',
      type: "post",
      dataType: "json",
      data: {
        event: {
          title: this.event.title
        }
      }
    }).done((response) => {
      console.log(response)
      this.event.$save()
    }).fail(() => {
      console.log("Ajax request fails!")
    }).always(() => {
      console.log("This always happens regardless of successful ajax request or not.")
    })
  }
}

// ajax to call our rails API
$.ajax({
  url: 'http://localhost:3000/events.json',
  type: "get",
  dataType: "json",
}).done((response) => {
  console.log(response)
}).fail(() => {
  console.log("Ajax request fails!")
}).always(() => {
  console.log("This always happens regardless of successful ajax request or not.")
})

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
