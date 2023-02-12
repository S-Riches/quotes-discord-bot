const fs = require('fs');
const path = require('path');
function storeReroll(messageID, data) {
    // Create an empty json object to store our ✨stuff✨ in (we storing data in here btw)
    const aiData = {
        data: [],
    };
    const dirPath = path.join(__dirname, 'reroll');
    // Create date object
    const date = new Date();
    // Push data to json object
    aiData.data.push({ 'dataTime': date, 'images': [data] });
    // write stringified json object to file with name of message id the bot created
    fs.writeFile(`${dirPath}/${messageID}.json`, JSON.stringify(aiData), () => {
        // Once the file has been written we are going to write it to a json log file so the datetime of each file can be read without having to open each file
        fs.readFile(`${dirPath}/reroll_log.json`, function(err, f) {

            if (err) {
                // Log error
                console.log(err);
                // Throw the error - yeet
                throw err;
            }
            else {
                // The already exists so we are going to ge the json object and write to it
                let json = null;
                if (f == '') {
                    // The file exists but there is no json in the file - so create json object using new empty object
                    json = {
                        data: {},
                    };
                }
                else {
                    // The file already exists so get the data from the file - so create json object using stored data
                    json = JSON.parse(f);
                }

                // Add json to object
                json.data[[messageID]] = Date.now();
                // We can now push the json to the file - done
                fs.writeFile(`${dirPath}/reroll_log.json`, JSON.stringify(json), function(err) {
                    if (err) {
                        // Some other error
                        throw err;
                    }
                });


            }
        });


    });
}

// test data
// storeReroll('1234567890qwertyuiop', 'weufhqpwepthruqpo3i4uiwy3ehapfog7yoraehpuovgq73489fq93p483334847q3gyeiuhrfg7q3yw4iehupr497gwy348oehupr4g9w3ybeoriuspgiyaboifgpuruyhf9d8g7peory8');


module.exports = { storeReroll };