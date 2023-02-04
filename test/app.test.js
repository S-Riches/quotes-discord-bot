const app = require("../src/app.js");
const dotenv = require("dotenv").config();

describe("Set up initialisation", () => {
    test("env values are working", () => {
        const osEnvValue = process.env.os;
        expect(osEnvValue).not.toBeUndefined();
    });
    test("user has a discord token", () => {
        const TOKEN = process.env.DISCORD_TOKEN;
        expect(TOKEN).not.toBeUndefined();
    });
});
