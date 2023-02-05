/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const dotenv = require('dotenv').config();
const convert64ToImg = require('../src/convertBase64ToImage.js');
const path = require('path');
const fs = require('fs');
const jsonData = require('./testData/testData.json');

describe('Environment variable check test suite', () => {
    test('env values are working', () => {
        const osEnvValue = process.env.os;
        expect(osEnvValue).not.toBeUndefined();
    });
    test('user has a discord token', () => {
        const TOKEN = process.env.DISCORD_TOKEN;
        expect(TOKEN).not.toBeUndefined();
    });
});

describe('CreateImageTest', () => {
    const dirPath = path.join(__dirname, '../src/images');
    test('creates image from base64 data', async () => {
        convert64ToImg.createImage('test', jsonData.testBase64);
        console.log('Test.jpg created');
        let doesFileExist;
        try {
            if (fs.existsSync(dirPath + '/test.jpg')) {
                doesFileExist = true;
            }
        }
        catch (err) {
            console.error(err);
            doesFileExist = false;
        }
        expect(doesFileExist).toBe(true);
    });
    afterAll(async () => {
        console.log('Test.jpg deleted');
        fs.unlinkSync(`${dirPath}/test.jpg`);

    });
});
