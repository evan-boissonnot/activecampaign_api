const request = require("request");


function addCustomFieldToContact(apiKey, domainName, contactId, fieldId, fieldValue) {
    let url = `https://${domainName}.api-us1.com/api/3/fieldValues`;

    let item = { 
        fieldValue: {
            contact: contactId,
            field: fieldId,
            value: fieldValue
        }
    }

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

module.exports = addCustomFieldToContact;