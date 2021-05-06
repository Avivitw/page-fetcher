const request = require('request');
const fs = require('fs');
const arrArgs = process.argv.slice(2);
const isValid = require('is-valid-path');

const url = arrArgs[0];
const filePath = arrArgs[1];

const fetcher = function () {
  if (!isValid(filePath)) {
    console.log(`filePafth is invalid!`)
    process.exit();
    }
  
  request(url, (error, response, body) => {
    if (error) {
      console.log(`We got an error: ${error}`)
      process.exit();
    }
    if (response && response.statusCode === 200) {
      fs.writeFile(filePath, body, (err) => {
        if (err){
          throw err;
        } else {
          console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
        }
      });
    }
  
  
  });

  
}

fetcher();


