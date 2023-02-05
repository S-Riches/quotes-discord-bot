// import basic discord js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv").config();
const aiImage = require("./getAiImage.js");
const convertBase64 = require("./convertBase64ToImage.js");

// grab the discord token from the .env file
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
// allows reuse
// create a new instance of the client, returns the client once created to check the client was created successfully
function createClientInstance() {
    // intents define which events discord sends to the bot, it ensures the caches for servers, channels and roles are available to use
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    });
    // when the client is ready, run this code
    client.once(Events.ClientReady, (c) => {
        console.log(`Logged in as ${c.user.tag}`);
    });

    // currently reads message input, and returns it to console.
    client.addListener("messageCreate", async (message) => {
        if (message.author.bot) return false;
        // check the content of the message contains *"..."
        if (
            String(message.content).includes('*"') &&
            String(message.content).includes('"*')
        ) {
            // handle the message and turn it into a prompt
            console.log(`Message = ${message.content}`);
            let string = String(message.content);
            let prompt = string.substring(
                string.indexOf('*"') + 2,
                string.indexOf('"*')
            );
            console.log(`prompt = ${prompt}`);
            let data = await aiImage.generateAiImage(prompt);
            // creates the image
            convertBase64.createImage(prompt, data);
        }
    });

    client.login(DISCORD_TOKEN);
}

module.exports = { createClientInstance };

createClientInstance();
