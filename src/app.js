// import basic discord js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv").config();

// grab the discord token from the .env file
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
// allows reuse
// create a new instance of the client, returns the client once created to check the client was created successfully
function createClientInstance() {
    // intents define which events discord sends to the bot, it ensures the caches for servers, channels and roles are available to use
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    // when the client is ready, run this code
    client.once(Events.ClientReady, (c) => {
        console.log(`Logged in as ${c.user.tag}`);
    });
    client.login(DISCORD_TOKEN);
}

module.exports = { createClientInstance };

// client = new Client({ intents: [GatewayIntentBits.Guilds] });
// // when the client is ready, run this code
// client.once(Events.ClientReady, (c) => {
//     console.log(`Logged in as ${c.user.tag}`);
// });

createClientInstance();
