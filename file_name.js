var Path = require('path')
var Pa = Path.join('uploads','output.pdf')
var fs = require('fs')
console.log(Pa)
fs.rename(Pa, 'uploads/output', () => {
    console.log("\nFile Renamed!\n");
   
  });