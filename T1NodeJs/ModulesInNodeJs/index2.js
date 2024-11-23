/*
make a program in an "index2.js" file that, given a vector of people's names, displays them on the screen separated by
commas. You must define the array of names by hand within the code. For example, for the
array ["Nacho", "Ana", "Mario", "Laura"], the output of the program should be: https://lodash.com/docs
Nacho, Ana, Mario, Laura

NOTE: check the join method in the "lodash" documentation, it can be very useful for
this exercise.
*/

const lodash = require ('lodash');

let vectorNombres=["Nacho", "Ana", "Mario", "Laura"];

//CON JOIN
console.log(lodash.join(vectorNombres, ', '));