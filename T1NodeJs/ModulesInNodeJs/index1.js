/*
take a look in the Node API at the "os" module, and specifically to the userInfo method (https://nodejs.org/api/os.html#osuserinfooptions)
.Use it to make a program that greets the user who has accessed the operating system. For example, if the user is "manuela", it should say
"Hello manuela". Run the program in the terminal to check its correct operation.

HELP: the userInfo method returns an object with various properties of the user who
has accessed. To obtain the username, we must access the username property
*/

//Cogemos el modulo os
const os = require('os');
//Accedemos al metodo userInfo con user (y luego propiedad username)
var user = os.userInfo();

console.log("Hello  " + user.username);