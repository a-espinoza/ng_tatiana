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
    userCreate
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
}

function EventFactoryFunction($resource) {
  return $resource("http://localhost:3000/events/:id", {}, {
    update: { method: "put" }
  })
}

function UserFactoryFunction($resource) {
  return $resource("http://localhost:3000/users/:id")
}

function eventIndexControllerFunction(EventFactory, UserFactory){
  this.events = EventFactory.query()
  console.log(UserFactory);
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

}

function userCreate(UserFactory){
  console.log("usercreate")
  console.log(window.data);
  console.log(UserFactory);
  user = new UserFactory()
  console.log(user);
}

function eventNewControllerFunction(EventFactory, $state) {
  this.random = function(){
    var words = ['PurpleRock', 'redPaper', 'rainbowScissors', 'atmosphericPrisson', 'greenCofee', 'giatShirt', 'signRacoon', 'ballonAnt', 'randomCommit',
    'whopperInsect', 'intenseShoe',  'conffettiSandwich', 'instantHomework', 'brainWind', 'twoWall', 'perfectGlass', 'commandRope', 'yellowGrass', 'rockandSoup'];
  var word = words[Math.floor(Math.random() * words.length)];
  return word
  }}
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

// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {
  IN.Event.on(IN, "auth", getProfileData);
}

// Handle the successful return from the API call
function onSuccess(data) {
  window.data = data
  userCreate()
}




// Handle an error response from the API call
function onError(error) {
  console.log(error);
}

// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
  IN.API.Raw("/people/~:(id,firstName,lastName,emailAddress,summary,picture-urls::(original),headline)?format=json").result(onSuccess).error(onError);
}

//randomize word/codeGenerator
