const fs = require('fs').promises;
const path = require('path');
const base64img = require('./convertBase64ToImage');
async function getRerollImage(messageID, input) {
    // Create an empty json object to store our ✨stuff✨ in (we storing data in here btw)
    const dirPath = path.join(__dirname, 'reroll');
    

    try {
        // open json file of name messageID
        const f = await fs.readFile(`${dirPath}/${String(messageID)}.json`);
        // parse json into new var imgData
        const imgData = JSON.parse(f);

        // is able to return the same image but that can be fixed later
        return base64img.createImage(input, imgData['data'][0]['images'][0][Math.floor((Math.random() * 9))].base64);
    }
    catch (err) {
        // Log error
        console.log(err);
        // If cannot gen image return -1
        return -1;
    }


}

// test data
// getRerollImage("1072469540283367514","bingus")


module.exports = { getRerollImage };