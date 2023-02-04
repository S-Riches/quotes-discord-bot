const app = require("../src/app.js");
const dotenv = require("dotenv").config();

describe("Enviroment variable check test suite", () => {
    test("env values are working", () => {
        const osEnvValue = process.env.os;
        expect(osEnvValue).not.toBeUndefined();
    });
    test("user has a discord token", () => {
        const TOKEN = process.env.DISCORD_TOKEN;
        expect(TOKEN).not.toBeUndefined();
    });
});

describe("Discord bot test suite", () => {
    // not terribly sure how to test the bot, need to read up on this as it makes the most sense to test commands??
});
