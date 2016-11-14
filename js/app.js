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
<<<<<<< HEAD
.controller("EventCheckinController", [
  "EventFactory",
  "$state",
  EventCheckinControllerFunction
=======
.factory("AttendanceFactory", [
  "$resource",
  AttendanceFactoryFunction
])
.factory("UserIdFactory", [
  '$resource',
  UserIdFactoryFunction
>>>>>>> 90989094d58e8ddabad8117a9a599ce6493909ab
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
<<<<<<< HEAD
}

function EventFactoryFunction($resource) {
  return $resource("https://tatiana-ng.herokuapp.com/events/:id", {}, {
=======
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

function EventFactoryFunction($resource) {
  return $resource("http://localhost:3000/events/:id", {}, {
>>>>>>> 90989094d58e8ddabad8117a9a599ce6493909ab
    update: {
      method: "put"
    },
    checkin: {
      method: "get"
    }
  })
}

function UserFactoryFunction($resource) {
<<<<<<< HEAD
  return $resource("https://tatiana-ng.herokuapp.com/users/:id", {}, {
    create: { method: "POST" }
=======
  return $resource("http://localhost:3000/users/:id", {}, {
    create: {
      method: "post"
    },
    get: {
      method: "get"
    }
  })
}

function UserIdFactoryFunction($resource){
  return $resource("http://localhost:3000/users/id/:linkedinId",
  {
    linkedinId: '@linkedinId'
  }, {
    get: {method: 'get'}
>>>>>>> 90989094d58e8ddabad8117a9a599ce6493909ab
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

<<<<<<< HEAD
function EventWelcomeControllerFunction(EventFactory, UserFactory) {
  console.log("welcome");
=======
function EventWelcomeControllerFunction(EventFactory, UserFactory, $state, UserIdFactory) {
  wait()
  function wait(){
    if(typeof window.data !== "undefined"){
      UserIdFactory.get({linkedinId: window.data.id}, function(user){
        console.log(user);
          if (user.linkedinId === window.data.id) {
            console.log("user exists")
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
>>>>>>> 90989094d58e8ddabad8117a9a599ce6493909ab
}

function Event‘‘Checkin’’ControllerFunction(EventFactory, $state) {
  const self = this
  this.check = function(){
<<<<<<< HEAD
    EventFactory.query(function(response){
      response.forEach(function(e){
        if(e.code == self.event.code){
        $state.go('userShow', {id: e.id})
        }
      })
    })
  }
}

=======
    attendance = AttendanceFactory.create({
      user: self.users.code,
      event: self.event.code
    }, function(response){
      console.log(response);
    })
    EventFactory.get(attendance)
    $state.go("attendanceCreate", {id: attendance.event_id})
  }
}
>>>>>>> 90989094d58e8ddabad8117a9a599ce6493909ab

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
<<<<<<< HEAD
    IN.API.Raw("/people/~:(id,firstName,lastName,emailAddress,summary,picture-urls::(original),headline)?format=json").result(onSuccess).error(onError);
    function onSuccess(data, UserFactory) {
      console.log(data);
=======
    IN.API.Raw("/people/~:(id,firstName,lastName,emailAddress,summary,picture-urls::(original),public-profile-url,headline)?format=json").result(onSuccess).error(onError);
    function onSuccess(data, UserFactory) {
      window.data = data
      EventWelcomeControllerFunction()
>>>>>>> 90989094d58e8ddabad8117a9a599ce6493909ab
    }
    function onError(error) {
      console.log(error);
    }
  })
}
