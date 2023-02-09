// imports
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'images');
// flow
// * take in the base64 data
// takes in the data and then converts to an image that is stored in a local folder in the code
function createImage(fileName, data) {
    // * convert it to an image
    // easier to create an image via base64 -> buffer -> image
    const buffer = Buffer.from(data, 'base64');
    // * save that image to a local storage instance
    // handle punctuation to avoid embed issues
    fileName = String(fileName).replace(
        RegExp(/[.,/#!$%^&*;:'{}=\-_`~()? ]/g),
        '',
    );
    try {
        // try and write image to /images dir
        fs.writeFileSync(`${dirPath}/${fileName}.jpg`, buffer);
    }
    catch (e) {
        // catch and log error
        console.log(e);
    }
    console.log(`created ${fileName}`);
    // return file name of created image
    return fileName + '.jpg';
}

module.exports = { createImage };
