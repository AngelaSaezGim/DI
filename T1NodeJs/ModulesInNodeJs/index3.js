/*
Install the package "moment" (https://www.npmjs.com/package/moment)*/

const { has } = require('lodash');
const moment = require ('moment');

/*
Once included, do the following:
• Save the current date and time in a variable. You can do this with:*/
console.log("-----------------------");
let now = moment ();
console.log("Fecha actual ---> " + now.format('HH:mm DD-MM-YYYY'));

/*
• Define a date before the current one. You can specify the date format in a text string,
followed by the date pattern. For example:*/
let before = moment("10/07/2015 04;34", "DD/MM/YYYY HH:mm");
console.log("Fecha ANTERIOR a la actual ---> " + before.format('HH:mm DD-MM-YYYY'));

/*
• Also, define a date after the current one. You can use the same nomenclature as for
the previous date, but with a later one.*/

let after = moment("10/12/2030 15:12", "DD/MM/YYYY HH:mm");
console.log("Fecha POSTERIOR a la actual ---> " + after.format('HH:mm DD-MM-YYYY'));
console.log("-----------------------");

/*
• Print by console how many years have passed from the old date to the current one.
To calculate this data, the duration method can be useful:*/
//moment.duration (newdate.diff (olddate)).years ()

yearsDifference = moment.duration (now.diff (before)).years ()

console.log("Desde " + before.format('DD-MM-YYYY') + " a " + now.format('DD-MM-YYYY'));
console.log("Han pasado " + yearsDifference + " años");
console.log("-----------------------");

/*
• Get by console, in a similar way, how many years and months are left to reach the
future date from the current one.*/

yearsDifference2 = moment.duration (after.diff (now)).years ()
console.log("Desde " + now.format('DD-MM-YYYY') + " hasta " + after.format('DD-MM-YYYY'));
console.log("Pasaran " + yearsDifference2 + " años")
console.log("-----------------------");

/*
• Now show in the console wether the old date is, indeed, before the current one. For
this you can use the isBefore method (or isAfter, depending on how you compare
them):*/

if (before.isBefore (now)){
    console.log(before.format('DD-MM-YYYY') + " isBefore " +  now.format('DD-MM-YYYY'));
}

if (now.isAfter (before)){
    console.log(now.format('DD-MM-YYYY') + " isAfter " + before.format('DD-MM-YYYY'));
}
console.log("-----------------------");

/*
• Finally, create a date that is exactly one month from now. To do this, use the add
method, adding a month to the current date. Get this date on the screen, formatted as
DD / MM / YYYY. Use the format method for this
*/
let nowMonth=now.add(1,'months');
console.log(nowMonth.format('DD-MM-YYYY'));
console.log("-----------------------");
