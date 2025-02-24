Description


This is a simple REST API built with Node.js, Express, and MongoDB for a car rental system. It allows users to register, log in, view their profile, and get a list of available rental cars.

Requirements
Before starting the application, make sure you have the following installed:

Node.js (https://nodejs.org)
MongoDB (https://www.mongodb.com/try/download/community)
Postman (https://www.postman.com/) for testing the API


Setup


Clone the repository:

git clone https://github.com/altina2801/taskB.git

Install the required dependencies:

npm install

Start the server:

node server.js
The API will be available at http://localhost:3000.

Testing the Endpoints:


A. Register a New User (POST /register):

Open Postman.
Select POST and enter the URL: http://localhost:3000/register.
In the Body section, choose raw and set the type to JSON. Enter the following data:

{
  "fullName": "Altina",
  "email": "altina@example.com",
  "username": "altina123",
  "password": "password123"
}
Press Send. You should get a response saying:

{ "message": "User registered successfully" }
Note: You cannot register with the same email twice. If you try, you will receive a response like:

{ "message": "Email already registered" }
B. Login (POST /login):

In Postman, select POST and enter the URL: http://localhost:3000/login.
In the Body, enter:

{
  "username": "altina123",
  "password": "password123"
}
Press Send. You will receive a JWT token in the response. Copy the token.
C. Get My Profile (GET /my-profile):

In Postman, select GET and enter the URL: http://localhost:3000/my-profile.
Under Headers, add a key named Authorization with the value:

Bearer YOUR_TOKEN
Replace YOUR_TOKEN with the token you received after login.
Press Send. You will get your profile information in the response.
D. Add a Car (POST /cars):

In Postman, select POST and enter the URL: http://localhost:3000/cars.
In the Body, enter the following car data:

{
  "name": "Golf mk8",
  "price_per_day": 50.0,
  "year": 2015,
  "color": "black",
  "steering_type": "automatic",
  "number_of_seats": 5
}
Press Send. You should receive a response confirming the car was added.
Note: You can add one car or multiple cars at a time in the request body. If you try to add multiple cars, make sure the body is an array like this:

[
  {
    "name": "Golf mk8",
    "price_per_day": 50.0,
    "year": 2015,
    "color": "black",
    "steering_type": "automatic",
    "number_of_seats": 5
  },
  {
    "name": "Audi A4",
    "price_per_day": 60.0,
    "year": 2017,
    "color": "blue",
    "steering_type": "manual",
    "number_of_seats": 5
  }
]
E. Get Rental Cars (GET /rental-cars):

In Postman, select GET and enter the URL: http://localhost:3000/rental-cars.
Press Send. You will get a list of all rental cars sorted from lowest to highest price.
F. Filter Rental Cars (GET /rental-cars with query params):

In Postman, select GET and enter the URL with query parameters to filter cars. For example:

http://localhost:3000/rental-cars?year=2015&color=black
Press Send. You will get a list of cars filtered by the specified year and color.
If no cars match the filter, you will receive a message saying:

{ "message": "Sorry, we do not have any cars matching your request." }
