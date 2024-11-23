/*
Exercise 4
Create a class that defines cars with their brand and license plate. Create 3
different cars. Make these cars have event emitters associated with
inheritance.
Add listeners and create events with emit to use them.
The brand and license plate of the car will be displayed in the console.
*/

const events=require('events');

let EventEmitter=events.EventEmitter;
let emisorCar=new EventEmitter();

class Car extends events.EventEmitter{
    constructor(license,brand){
        super();
        this.license=license;
        this.brand=brand;
    }
}

let car1=new Car('111','Toyota');
let car2=new Car('222','Audi');
let car3 = new Car('333', 'Ford');
let cars=[car1,car2,car3];

cars.forEach(function(car) {
    car.on('report', function(){
    console.log(this.license + " - " + this.brand);
});
})

car1.emit('report');
car2.emit('report');
car3.emit('report');