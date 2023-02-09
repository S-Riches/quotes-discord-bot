const { Client } = require('craiyon');


async function generateAiImage(promptText) {
    // create craiyon instance
    const craiyon = new Client();
    // generate image based on user text - this has to be awaited.
    const result = await craiyon.generate({
        prompt: promptText,
    });
    // currently just prints the data needed for the first result to be converted elsewhere
    // console.log(await result._images[0].base64);

    // We now want to store the data in a json file

    return await result._images;
}
// console.log("running script, can take up to 2 minutes, please be patient");
// basic usage atm
// generateAiImage("cheese");

module.exports = { generateAiImage };
