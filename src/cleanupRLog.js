const fs = require('fs');
const path = require('path');
async function cleanupRLog() {
    // We need to loop throught the reroll log and remove any files that are older than 24 hour old
    const dirPath = path.join(__dirname, 'reroll');
    fs.promises.readFile(`${dirPath}/reroll_log.json`).then(data => {
        if (data == '') {
            // The file is empty so there is nothing to clean up
            console.log('Clean Log: File was empty - Skipping');
        }
        else {
            const RLog = JSON.parse(data);
            // We now have access to the data in the file
            for (const x in RLog.data) {
                // 86400000 = 24 hours in milliseconds
                // cached image data will be purged after 24 hours - this works regardless of if the program is running or not.
                // Uses the epoch time stored in the file and the current epoch time of execution to workout how old the cache'd
                // data is.
                if ((Date.now() - RLog.data[x]) > 86400000) {
                // We can remove the object from the json file

                    delete RLog.data[x];
                    // We now need to remove the file
                    fs.unlink(`${dirPath}/${x}.json`, function(err) {
                        if (err) {
                            if (err.errno == -2) {
                            // The file cannot be found but was in the log file so just ignore this and carry on
                            }
                            else {
                                // Some other error
                                throw err;
                            }

                        }
                    });
                    // Log removed the message
                    console.log(`Clean Log: Removed message ${x}`);

                }
            }

            // Once we are finished cleaning the file we can save the file with the new json object
            fs.writeFile(`${dirPath}/reroll_log.json`, JSON.stringify(RLog), function(err) {
                // I've  never had an error here so im not gonna gracefully handle it
                if (err) {
                    // Some other error
                    throw err;
                }
            });
            // Done
            console.log('Clean Log: Done');
        }

    });
}


module.exports = { cleanupRLog };