### Design document for the quotes bot

##### PLEASE PLEASE FOLLOW TTD WHEREVER POSSIBLE, JEST V GOOD AND SAVE TIME IN LONG RUN

basic usage, to run automatic tests, run `npm run watchAll` in a seperate terminal, will test after each saved change.

for the api testing it runs a call to the api which takes ages to return base64 data, so it makes the call before all (tests in the file) then saves the data to be used elsewhere in the program

###Basic idea

-   user types in a prefix like \* followed by quotes " "
    -   e.g \*"a quick brown fox jumping over a lazy fox"
-   the discord bot registers this, then puts a 'card', similar to how vexera puts in the photo when you type +np 
-   we await a generated image, then parse it into the 'card' after its generated X does it differently 

very very simple functionality

## Tasks

-   write logic to be able to take input from the user in the quotes channel, using whatever is between the \*"" as a prompt / done
-   write the logic to convert the base64 data into an image see refs:stack overflow image base64 / done
-   write logic to put the image into a card / done
-   author section of the embed / done
-   write tests / done
-   readme /
-   ???
-   push to aws
-   reroll / - done
-   potentially look into kafka, for allowing the storage of the base 64 data to allow the user to reroll if they dont like the image --- potentia reroll idea X - done
-   startup checks (files and folders present) - done
-   commented all the things - done
-   need a better way of getting th author as if " - " isn't present the promt is used as the author tag and that looks a bit mid
-   add a way of not having the same image appear twice when rerolling - its not a massive thing but would improve ux
## refs

see [discord.js](https://discord.js.org/#/)
see [discord.js send image/attachment](https://discord.js.org/#/docs/discord.js/stable/class/MessageAttachment)
[get the bot in the server](https://discord.com/api/oauth2/authorize?client_id=1071513783807254528&permissions=2147485760&scope=bot%20applications.commands)
see [stack overflow image base64](https://stackoverflow.com/questions/21227078/convert-base64-to-image-in-javascript-jquery) for being able to put the base64 data to an image, can use [this website](https://codebeautify.org/base64-to-image-converter) to test base64 output to images in the mean time
