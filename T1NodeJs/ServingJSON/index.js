/*
Exercise: Create a JSON file and show it on the server in the way you choose.
With the help of this article comment some advantages and disadvantages of each method.
https://blog.codingblocks.com/2018/reading-json-files-in-nodejs-require-vs-fs-readfile/
Upload 3 files:
.js
.json
pdf with the advantages and disadvantages
*/

const fs = require("fs");
// Read users.json file
fs.readFile('./user.json', 'utf-8', function(err, data) {
// Check for errors
if (err) throw err;
// Converting to JSON
let usersJSON = JSON.parse(data);

console.log(usersJSON); // Print users

 // Defining new user
 let NewUser = {
    name: "New User",
    age: 30,
    language: ["PHP", "Go", "JavaScript"]
};

// STEP 2: Adding new data to users object
usersJSON.push(NewUser);

// STEP 3: Write back the updated data to the JSON file
fs.writeFile('./user.json', JSON.stringify(usersJSON, null, 2), (err) => {
    if (err) throw err;
    console.log("New user added successfully.");
});
  
// STEP 4: Remove the last added user (NewUser)
  usersJSON.pop();

// STEP 5: Write the file again after removing the new user
  fs.writeFile('./user.json', JSON.stringify(usersJSON, null, 2), (err) => {
      if (err) throw err;
      console.log("New user removed successfully.");
  });

});