// import basic discord js classes
const {
    Client,
    Events,
    GatewayIntentBits,
    EmbedBuilder,
    AttachmentBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const aiImage = require('./getAiImage.js');
const convertBase64 = require('./convertBase64ToImage.js');
const reroll = require('./storeReroll.js');
const fs = require('fs');
const path = require('path');
const { getRerollImage } = require('./getRerollImage.js');
const cleanLog = require('./cleanupRLog.js');
const init = require('./init.js');

// grab the discord token from the .env file
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
init.init();
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
        // When strating the application clean the log file
        cleanLog.cleanupRLog();
        
        console.log(`\nLogged in as ${c.user.tag}`);
    });


    client.on(Events.InteractionCreate, async (interaction) => {
        if (interaction.isButton()) {
            if (interaction.customId === 'message_reroll_image') {
                // we can now handle the button press
                // we need to create the new embed and new button objects to pass to discord.js using message.edit
                // we get message from the button object from interaction
                const filename = await getRerollImage(interaction.message.id, interaction.message.embeds[0].title);
                // Filename returns -1 if it was unable to open the file
                if (filename != -1) {
                    // Attach the new image file
                    const file = new AttachmentBuilder(`./src/images/${filename}`);
                    // Create the main body of the embed
                    const responseEmbed = new EmbedBuilder()
                        .setTitle(interaction.message.embeds[0].title)
                        .setImage(`attachment://${filename}`)
                        .setTimestamp()
                        .setColor(0x4c00a3)
                        .setFooter({ text: 'Made with ♡ by The Biblically Accurate Quote\'s Bot' })
                        .setAuthor(interaction.message.embeds[0].author);
                    // Create the reroll button
                    const responseButton = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('message_reroll_image')
                                .setLabel('Reroll Image!')
                                .setStyle(ButtonStyle.Success),
                        );
                    // Update the embed using the interation object
                    await interaction.update({ embeds: [responseEmbed], files: [file], components: [responseButton] });
                    console.log(`Reroll: Updated Embed ${interaction.message.id}`);
                    // becuase we where able to generate an image we need to clean up
                    const dirPath = path.join(__dirname, 'images');
                    // yeet the file out of the disk
                    fs.unlinkSync(`${dirPath}/${filename}`);
                }
                else {
                    // If we cannot open the file that means that we have either deleted it or
                    // it was never there in the first place so just reply to the user that tried to press the button
                    interaction.reply({ content: `<@${interaction.user.id}> This Re-Roll Is No Longer Available.`, ephemeral: true });
                }


            }
        }

    });
    // currently reads message input, and returns it to console.
    client.addListener('messageCreate', async (message) => {
        if (message.author.bot) return false;
        // check the content of the message contains *"..."
        if (
            String(message.content).includes('*"') &&
            String(message.content).includes('"*')
        ) {
            // handle the message and turn it into a prompt
            console.log(`Message = ${message.content}`);
            const string = String(message.content);
            const prompt = string.substring(
                string.indexOf('*"') + 2,
                string.indexOf('"*'),
            );
            // get the author from the text if present
            let author = string.substring(
                string.indexOf('-') + 1,
            ).trim();
            if (author == '') {
                author = 'Anon';
            }
            console.log(`prompt = ${prompt}`);
            // This has all of the images in it now not just one
            const data = await aiImage.generateAiImage(prompt);
            // creates the image
            const imageName = convertBase64.createImage(prompt, data[0].base64);
            // * upload it to discord channel
            const file = new AttachmentBuilder(`./src/images/${imageName}`);
            const responseEmbed = new EmbedBuilder()
                .setTitle(prompt)
                .setImage(`attachment://${imageName}`)
                .setTimestamp()
                .setColor(0x4c00a3)
                .setFooter({ text: 'Made with ♡ by The Biblically Accurate Quote\'s Bot' })
                .setAuthor({ name: author });
            const rerollButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('message_reroll_image')
                        .setLabel('Reroll Image!')
                        .setStyle(ButtonStyle.Success),
                );
            const currentChannel = client.channels.cache.get(message.channel.id);
            const messageID = await currentChannel.send({ embeds: [responseEmbed], files: [file], components: [rerollButton] });
            reroll.storeReroll(messageID.id, data);
            // now that we have send the message we can get its id
            // * then delete it off the local storage instance (hopefully we can get discord to host the images for us)
            const dirPath = path.join(__dirname, 'images');
            fs.unlinkSync(`${dirPath}/${imageName}`);
            // We now need to cleanup the log file
            cleanLog.cleanupRLog();
        }
    });

    client.login(DISCORD_TOKEN);


}

module.exports = { createClientInstance };

createClientInstance();
