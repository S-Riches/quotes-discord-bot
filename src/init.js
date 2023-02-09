const fs = require('fs');
const path = require('path');
function init() {
    // reroll dirPath
    const rerollPath = path.join(__dirname, 'reroll');
    // images dirPath
    const imagesPath = path.join(__dirname, 'images');
    // Make sure reroll folder exists
    fs.mkdir(rerollPath, function(err) {
        if (err) {
            if (err.code == 'EEXIST') {
                // The folder already existed
                console.log('Init: Reroll Folder Already Exists - Skipping');
            }
            else {
                // Some other error
                throw err;
            }
        }
        else {
            // The folder has been created
            console.log('Init: Reroll Folder Created - Success');
        }
    });
    // Make sure reroll_log.json exists
    fs.stat(`${rerollPath}/reroll_log.json`, function(err) {
        if (err == null) {
            // If file already exists
            console.log('Init: Reroll Log File Already Exists - Skipping');
        }
        else if (err.code === 'ENOENT') {
            // If the file doesn't exist
            fs.writeFile(`${rerollPath}/reroll_log.json`, '', function(err) {
                if (err) {
                    // let us know if this failed
                    // then crash the fella
                    console.log(err);
                    throw err;
                }
                console.log('Init: Reroll Log File Created - Success');
            });
        }
        else {
            // Some other error
            console.log('Init: reroll_log.json error - ', err.code);
        }
    });


    // Make sure reroll images exists
    fs.mkdir(imagesPath, function(err) {
        if (err) {
            if (err.code == 'EEXIST') {
                // The folder already existed
                console.log('Init: Images Folder Already Exists - Skipping');
            }
            else {
                // some other error
                throw err;
            }
        }
        else {
            // The folder has been created
            console.log('Init: Images Folder Created - Success');
        }
    });

    


}


module.exports = { init };