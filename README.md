# ng_tatiana

This repository is the AngularJS front end of a two-part networking event attendance management application using the LinkedIn API, Connect+.

##Technologies Used
Connect+ uses a PostgreSQL database. We accessed its Ruby on Rails API through Active Record, to return JSON to the front end. The front end is handled by AngularJS. Connect+'s API is hosted by Heroku, and the front end is on FireBase. The application accesses the LinkedIn API through oAuth 2.0.

##Installation
The application requires two repositories. Please also make note of the API, accessible at:
https://github.com/LWatsonlm/tatiana.

For this repo, please install dependencies using ```npm install```.  For the API, install dependencies using ```bundle install```.

##User Stories
* As an event owner, I should be able to create, read, update, and destroy my events.
* As an event owner, I should receive an event code to distribute to users at my event.
* As an attendee, I should be able to add people on LinkedIn with less than three clicks total.
* As an attendee, I want to be able to view attendees at the event that I am attending. These attendees should be filtered or styled based on hiring or looking status.
* As an attendee, I should be able to update my preferences and skill tags.
* As an attendee, I should be able to view attendees with whom I have attended previous events.


##Difficulties
* oAuth through LinkedIn was a challenge.  The process required multiple interdependent API calls, and documentation was sparse.
* Managing a many-to-many relationship between data models was a unique challenge.

##Future Improvements
* Analytics
* Streamline oAuth backend code
* Update CSS
