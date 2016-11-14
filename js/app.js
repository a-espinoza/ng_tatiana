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
  "$state",
  "UserIdFactory",
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
.controller("EventCheckinController", [
  "EventFactory",
  "$state",
  "AttendanceFactory",
  EventCheckinControllerFunction
])
.factory("EventFactory", [
  "$resource",
  EventFactoryFunction
])
.factory("UserFactory", [
  "$resource",
  UserFactoryFunction
])
.factory("AttendanceFactory", [
  "$resource",
  AttendanceFactoryFunction
])
.factory("UserIdFactory", [
  '$resource',
  UserIdFactoryFunction
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
  .state("attendanceCreate", {
    url: '/events/:id/users',
    templateUrl: 'js/ng-views/userShow.html',
    controller: 'EventCheckinController',
    controllerAs: 'vm'
  })
}

function AttendanceFactoryFunction($resource) {
  return $resource("http://localhost:3000/attendances/checkin/:user/:event",
  {
    user: '@user',
    event: '@event'
  }, {
    create: { method: "post" }
  })
}
//fix urls to link to heroku
function EventFactoryFunction($resource) {
  return $resource("http://localhost:3000/events/:id", {}, {
    update: {
      method: "put"
    },
    checkin: {
      method: "get"
    }
  })
}

function UserFactoryFunction($resource) {
  return $resource("http://localhost:3000/users/:id", {}, {
    create: {
      method: "post"
    },
    get: {
      method: "get"
    }
  })
}

// AM: What's the purpose of this factory?
function UserIdFactoryFunction($resource){
  return $resource("http://localhost:3000/users/id/:linkedinId",
  {
    linkedinId: '@linkedinId'
  }, {
    get: {method: 'get'}  // AM: Why did you need to include this part?
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
    this.whole.$delete({id: $stateParams.id})
    $state.go("eventWelcome") // AM: You might want to wrap this in a callback/promise to avoid any issues resulting from deleting asynchronously.
  }
}

function EventWelcomeControllerFunction(EventFactory, UserFactory, $state, UserIdFactory) {
  wait()
  function wait(){
    if(typeof window.data !== "undefined"){
      UserIdFactory.get({linkedinId: window.data.id}, function(user){
        console.log(user);
          if (user.linkedinId === window.data.id) {
            console.log("user exists")
            window.current_user = window.data
          }else{
            console.log("creating user");
            UserCreateControllerFunction(UserFactory, $state)
          }
      })
    }else{
      setTimeout(function(){
        wait()
      }, 400)
    }
  }
}

function EventCheckinControllerFunction(EventFactory, $state) {
  const self = this
  this.check = function(){
    attendance = AttendanceFactory.create({
      user: window.current_user.firstName,
      event: self.event.code
    }, function(response){
      $state.go("attendanceCreate", {id: attendance.event_id})
    })
  }
}

function eventNewControllerFunction(EventFactory, $state) {
  this.create = function(){
    Event = new EventFactory(this.event)
    Event.$save().then(event => {
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
  User = new UserFactory({
    name: window.data.firstName,
    lastName: window.data.lastName,
    photo_url: window.data.pictureUrls.values[0],
    linkedin_url: window.data.publicProfileUrl,
    linkedinId: window.data.id
  })
  User.$save().then(user => {
    window.current_user = user
    $state.go('eventWelcome')
  })
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
    IN.API.Raw("/people/~:(id,firstName,lastName,emailAddress,summary,picture-urls::(original),public-profile-url,headline)?format=json").result(onSuccess).error(onError);
    function onSuccess(data, UserFactory) {
      window.data = data
      EventWelcomeControllerFunction()
    }
    function onError(error) {
      console.log(error);
    }
  })
}
