const { Client } = require("craiyon");

async function generateAiImage(promptText) {
    const craiyon = new Client();
    const result = await craiyon.generate({
        prompt: promptText,
    });
    // currently just prints the data needed for the first result to be converted elsewhere
    // console.log(await result._images[0].base64);
    return await result._images[0].base64;
}
// console.log("running script, can take up to 2 minutes, please be patient");
// basic usage atm
// generateAiImage("cheese");

module.exports = { generateAiImage };
