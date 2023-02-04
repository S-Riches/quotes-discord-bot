// import basic discord js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv").config();

// grab the discord token from the .env file
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

function createClientInstance() {
    // create a new instance of the client
    // intents define which events discord sends to the bot, it ensures the caches for servers, channels and roles are available to use
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    // when the client is ready, run this code
    client.once(Events.ClientReady, (c) => {
        console.log(`Logged in as ${c.user.tag}`);
    });

    // log in to discord with the token
    client.login(DISCORD_TOKEN);
}
