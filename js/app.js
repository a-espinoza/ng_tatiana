angular
.module("tatiana", [
  "ui.router"
])
.config([
  "$stateProvider",
  Router
])
.controller("eventIndexController", [
  "EventFactory",
  eventIndexControllerFunction
])
.factory("EventFactory", [
  EventFactoryFunction
])

function eventIndexControllerFunction(EventFactory){
  $('body').append("<p>hello</p>")
}

function Router($stateProvider){
  console.log("router");
  $stateProvider
  .state("eventIndex", {
    url: "/events",
    templateUrl: "js/ng-views/index.html",
    controller: "eventIndexController",
    controllerAs: "vm"
  })
}

function EventFactoryFunction(){
  return {
    test: function(){
      console.log("factory working");
    }
  }
}

$.ajax({
  url: 'http://localhost:3000/events.json',
  type: "get",
  dataType: "json"
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
   IN.API.Raw("/people/~").result(onSuccess).error(onError);
}

// IN.User.logout(callbackFunction, callbackScope);
