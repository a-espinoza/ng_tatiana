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
  console.log("factory");
  EventFactory.test()
}

function Router($stateProvider){
  console.log("router");
  $stateProvider
  .state("eventIndex", {
    url: "/",
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
