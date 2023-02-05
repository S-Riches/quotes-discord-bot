// imports
const fs = require("fs");

// flow
// * take in the base64 data
// takes in the data and then converts to an image that is stored in a local folder in the code
function createImage(fileName, data) {
    // * convert it to an image
    // easier to create an image via base64 -> buffer -> image
    const buffer = Buffer.from(data, "base64");
    // * save that image to a local storage instance
    // handle spaces
    fileName = String(fileName).replace(RegExp(/ /g), "_");
    console.log(fileName);
    fs.writeFileSync(`${fileName}.jpg`, buffer);
    console.log(`created ${fileName}`);
}

module.exports = { createImage };
// * upload it to discord channel
// * then delete it off the local storage instance (hopefully we can get discord to host the images for us)
