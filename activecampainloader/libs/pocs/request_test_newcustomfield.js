const request = require("request");


function createCustomField(apiKey, domainName) {
    let url = `https://${domainName}.api-us1.com/api/3/fields`;

    let item = {
        field: {
            type: 'text',
            title: 'urltovalidaccount',
            perstag: 'URLTOVALIDACCOUNT',
            isrequired: 1,
            visible: 1
        }
    };

    let options = { 
        headers: {
            'Api-Token': apiKey
        },
        method: 'POST',
        url: url,
        body: JSON.stringify(item)
    };

    request(options, function (error, response, body) {

        if (error) throw error;
    
        var resultAsJson = JSON.parse(body);
        console.log(resultAsJson); 
      });
}

module.exports = createCustomField;