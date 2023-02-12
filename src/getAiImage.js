const { Client } = require('craiyon');


async function generateAiImage(promptText) {
    // create craiyon instance
    const craiyon = new Client();
    // generate image based on user text - this has to be awaited.
    const result = await craiyon.generate({
        prompt: promptText,
    });
    // We now want to store the data in a json file
    return await result._images;
}

module.exports = { generateAiImage };
