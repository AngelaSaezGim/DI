/*
Exercise 3
Create an event called «hello» that displays ‘hello’ in the console every 5 seconds.
*/

const events=require('events');

let EventEmitter=events.EventEmitter;
let emisorSaludo=new EventEmitter();

setInterval (function () {
    emisorSaludo.emit ('hello');
    }, 5000);

emisorSaludo.on ('hello', function () {
    console.log("hello");
});
    