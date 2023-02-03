### Design document for the quotes bot

Basic idea

-   user types in a prefix like \* followed by quotes " "
    -   e.g \*"a quick brown fox jumping over a lazy fox"
-   the discord bot registers this, then puts a 'card', similar to how vexera puts in the photo when you type +np
-   we await a generated image, then parse it into the 'card' after its generated

very very simple functionality

see [open ai docs](https://platform.openai.com/docs/guides/images/usage?lang=node.js)
see [discord.js](https://discord.js.org/#/)
see [discord.js send image/attachment](https://discord.js.org/#/docs/discord.js/stable/class/MessageAttachment)
