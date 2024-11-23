/*
Exercise 1
Let's suppose we want to create a robot. This robot has a remote control
with the following action:
• forward
Create a function «forward» that displays in the console: ‘The robot
moves forward’.
Add a listener to the function and create an event with emit to use it.
*/

/*
Exercise 2
Expand the previous exercise:
Let's suppose we want to create a robot. This robot has a remote control
with the following actions:
• forward
• backward
• greet
Create a function for each of the actions that displays a message in the
console, like ‘The robot moves forward’.
Add listeners to each function and create events with emit to use them
*/

const events=require('events');

let EventEmitter=events.EventEmitter;
let emisorRobot=new EventEmitter();

emisorRobot.on ('forward', function () {
    console.log(forward())
});

emisorRobot.on ('backward', function () {
    console.log(backward())
});

emisorRobot.on ('greet', function () {
    console.log(greet())
});

function forward() {
    return "The robot moves forward";
  }

  function backward() {
    return "The robot moves backward";
  }

  function greet() {
    return "The robot greets";
  }
  
emisorRobot.emit("greet");
emisorRobot.emit("backward");
emisorRobot.emit("forward");
emisorRobot.emit("forward");