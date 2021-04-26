const fs = require('fs')

fs.readFile('output.pdf', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})