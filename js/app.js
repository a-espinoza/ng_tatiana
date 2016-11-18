angular
.module("tatiana", [
  "ui.router",
  "ngResource"
])
.config([
  "$stateProvider",
  "$locationProvider",
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
  "KeyFactory",
  EventWelcomeControllerFunction
])
.controller("NewSignInController", [
  "KeyFactory",
  "$window",
  "$http",
  "$stateParams",
  "$state",
  NewSignInControllerFunction
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
.controller("AuthController", [
  "$stateParams",
  "$http",
  AuthController
])
.controller("Home", [
  Home
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
.factory("KeyFactory", [
  '$resource',
  KeyFactoryFunction
])

// Routing
function Router($stateProvider, $locationProvider){
  $locationProvider.html5Mode(true)
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
    url: "/welcome",
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
  .state("authRedirect", {
    url: '/auth',
    templateUrl: 'js/ng-views/newSignIn.html',
    controller: 'AuthController',
    controllerAs: 'vm'
  })
  .state("Home", {
    url: '/',
    templateUrl: 'js/ng-views/newSignIn.html',
    controller: 'Home',
    controllerAs: 'vm'
  })
  .state("NewSignIn", {
    url: '/signIn',
    templateUrl: 'js/ng-views/wait.html',
    controller: 'NewSignInController',
    controllerAs: 'vm'
  })
  .state("Wait", {
    url: '/loading',
    templateUrl: 'js/ng-views/wait.html'
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

function UserIdFactoryFunction($resource){
  return $resource("http://localhost:3000/users/id/:linkedinId",
  {
    linkedinId: '@linkedinId'
  }, {
    get: {method: 'get'}
  })
}

function KeyFactoryFunction($resource){
  return $resource("http://localhost:3000/",
  {
    url: '@url'
  }, {
    get: {method: 'get'},
    post: {method: 'post'}
  })
}

function AuthController ($stateParams, $http){
  let code = $stateParams.code
  console.log(code);
}

function Home (){
  console.log("home");
}

function NewSignInControllerFunction(KeyFactory, $window, $http, $stateParams, $state){
  console.log("hitting controller");
  if ($window.location.search){
    console.log("if loop");
    let code = $window.location.search.split("=")[1];
    console.log(code);
    $http({
      method: "post",
      url: `http://localhost:3000/code/?code=${code}`
    }).then(response => {
      console.log(response.data);
      window.data = response.data
      $state.go("eventWelcome")
    })
  } else {
    KeyFactory.get({}, response => {
        console.log(response.url);
        $window.location.href = response.url
    })
  }
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
  this.event = function(){
    $state.go('userShow', {id: $stateParams.id})
  }
}

function EventWelcomeControllerFunction(EventFactory, UserFactory, $state, UserIdFactory, KeyFactory) {
  console.log(window.data);
  wait()
  function wait(){
    console.log("wait");
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

function EventCheckinControllerFunction(EventFactory, $state, AttendanceFactory) {
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
