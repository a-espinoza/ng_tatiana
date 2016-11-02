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






// var User = $resource('/user/:userId', {userId:'@id'});
// var user = User.get({userId:123}, function() {
//   user.abc = true;
//   user.$save();
// });





//   this.users = []
//   this.attendances.forEach(function(attendance){
//     var user = UserFactory.get({id: attendance.user_id}, function(response){
//       console.log(user);
//       this.users.push(user)
//       console.log(this.users);
//     })
//   })
// })
