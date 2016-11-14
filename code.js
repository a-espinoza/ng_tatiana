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






// this.random = function(){
//   var words = ['PurpleRock', 'redPaper', 'rainbowScissors', 'atmosphericPrisson', 'greenCofee', 'giatShirt', 'signRacoon', 'ballonAnt', 'randomCommit',
//   'whopperInsect', 'intenseShoe',  'conffettiSandwich', 'instantHomework', 'brainWind', 'twoWall', 'perfectGlass', 'commandRope', 'yellowGrass', 'rockandSoup'];
//   var word = words[Math.floor(Math.random() * words.length)];
//   return word
// }}


        // for (i = 0; i < users.length; i++) {

        // }
      }
      // users.forEach(function(user){
      //   if(user.linkedinId == window.data.id){
      //     console.log("user already exists");
      //   }else{
      //     console.log("creating user");
      //
      //   }
      // })
  //   }

// }

}
// UserFactory.get({linkedinId: window.data.id}, function(user){
//   console.log(user);
// })
//
// Latoya = User.create!({name: 'Latoya Watson', photo_url: 'https://media.licdn.com/media/AAEAAQAAAAAAAAkNAAAAJDUxMWZkMDNiLWQ0YTctNDJkMC04NjljLWMyYTk3YjlhMGE0Mw.jpg', linkedin_url: 'https://www.linkedin.com/in/watsonlm'})
// Liza = User.create!({name: 'Liza Floyd', photo_url: 'https://media.licdn.com/media/AAEAAQAAAAAAAAjpAAAAJGRiMmViYjcwLWMyODYtNGIzZS04MDEyLTIzYWI2OTFlYzJjMA.jpg', linkedin_url: 'https://www.linkedin.com/in/lizafloyd'})
// Andres = User.create!({name: 'Andres Espinoza', photo_url: 'https://media.licdn.com/media/AAEAAQAAAAAAAAbEAAAAJDFmYTViNTA2LTQ4ODMtNGEzYS05N2Q1LTJlOTZjN2NjMWY5Yg.jpg', linkedin_url: 'https://www.linkedin.com/in/andres-espinoza'})
// Mike = User.create!({name: 'Mike Rubin', photo_url: 'https://media.licdn.com/media/p/6/005/07b/04d/25faf8c.jpg', linkedin_url: 'https://www.linkedin.com/in/mike-rubin'})
// Kevin = User.create!({name: 'Kevin Mahoney', photo_url: 'https://media.licdn.com/media/p/6/000/211/13b/15e05d3.jpg', linkedin_url: 'https://www.linkedin.com/in/kevin-mahoney-b58b2946'})
// Andy = User.create!({name: 'Andy Whitley', photo_url: 'https://media.licdn.com/media/AAEAAQAAAAAAAAlZAAAAJGI1MTkyMGYzLWRmOGItNGMwMy05Nzg1LTdkZTQ2ZDdhMDg0YQ.jpg', linkedin_url: 'https://www.linkedin.com/in/andrew-whitley'})
// Michael = User.create!({name: 'Michael Lai', photo_url: 'https://media.licdn.com/media/AAEAAQAAAAAAAAlZAAAAJDk1MGM4OTI4LWI0ZDQtNDg1OS1iMGE5LTRmZGE1MzU2NzJhYw.jpg', linkedin_url: 'https://www.linkedin.com/in/michaelzlai'})
// Adrian = User.create!({name: 'Adrian Maseda', photo_url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAJPAAAAJGI2NjIxYTBmLTYzZDctNDhhMC05ODFhLTZhMGUzZjgwZTMxZQ.jpg', linkedin_url: 'https://www.linkedin.com/in/adrianmaseda'})
// Jesse = User.create!({name: 'Jesse Shawl', photo_url: 'https://media.licdn.com/media/AAEAAQAAAAAAAAfSAAAAJDczNzQ5OGExLWU4YjQtNDlmNC1hZjRhLWRlZGNjNGM2ZDAyOQ.jpg', linkedin_url: 'https://www.linkedin.com/in/jesse-shawl-0a517361'})
// Nick = User.create!({name: 'Nick Oki', photo_url: 'https://media.licdn.com/media/AAEAAQAAAAAAAAfdAAAAJDNlNWZhY2VjLTFlZDYtNGQ5OC1iZDQ0LTMyNzBkYWI1NmU3ZA.jpg', linkedin_url: 'https://www.linkedin.com/in/nicholas-oki'})
// Liza.attendances.create!(event:RailsBeginnersNight)
// Liza.attendances.create!(event:CaBiHackNightVI)
// Liza.attendances.create!(event:CivicHacknight)
// Liza.attendances.create!(event:IntroToCodeWorkshop)
// Andres.attendances.create!(event:RailsBeginnersNight)
// Andres.attendances.create!(event:CaBiHackNightVI)
// Andres.attendances.create!(event:CivicHacknight)
// Andres.attendances.create!(event:IntroToCodeWorkshop)
// Latoya.attendances.create!(event:RailsBeginnersNight)
// Latoya.attendances.create!(event:CaBiHackNightVI)
// Latoya.attendances.create!(event:CivicHacknight)
// Latoya.attendances.create!(event:IntroToCodeWorkshop)
// Mike.attendances.create!(event:RailsBeginnersNight)
// Mike.attendances.create!(event:CaBiHackNightVI)
// Mike.attendances.create!(event:CivicHacknight)
// Mike.attendances.create!(event:IntroToCodeWorkshop)
// Kevin.attendances.create!(event:RailsBeginnersNight)
// Kevin.attendances.create!(event:CaBiHackNightVI)
// Kevin.attendances.create!(event:CivicHacknight)
// Kevin.attendances.create!(event:IntroToCodeWorkshop)
// Andy.attendances.create!(event:RailsBeginnersNight)
// Andy.attendances.create!(event:CaBiHackNightVI)
// Andy.attendances.create!(event:CivicHacknight)
// Andy.attendances.create!(event:IntroToCodeWorkshop)
// Michael.attendances.create!(event:RailsBeginnersNight)
// Michael.attendances.create!(event:CaBiHackNightVI)
// Michael.attendances.create!(event:CivicHacknight)
// Michael.attendances.create!(event:IntroToCodeWorkshop)
// Adrian.attendances.create!(event:RailsBeginnersNight)
// Adrian.attendances.create!(event:CaBiHackNightVI)
// Adrian.attendances.create!(event:CivicHacknight)
// Adrian.attendances.create!(event:IntroToCodeWorkshop)
// Jesse.attendances.create!(event:RailsBeginnersNight)
// Jesse.attendances.create!(event:CaBiHackNightVI)
// Jesse.attendances.create!(event:CivicHacknight)
// Jesse.attendances.create!(event:IntroToCodeWorkshop)
// Nick.attendances.create!(event:RailsBeginnersNight)
// Nick.attendances.create!(event:CaBiHackNightVI)
// Nick.attendances.create!(event:CivicHacknight)
// Nick.attendances.create!(event:IntroToCodeWorkshop)
