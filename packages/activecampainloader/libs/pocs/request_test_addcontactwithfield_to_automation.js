const request = require("request");

function returnOption(apiKey, url, item) {
    return { 
        headers: {
            'Api-Token': apiKey
        },
        method: 'POST',
        url: url,
        body: JSON.stringify(item)
    };
}

function addContactAndAddCustomFieldAndAddToAutomation(apiKey, domainName, item, fieldId, fieldValue, automationId) {
    let url = `https://${domainName}.api-us1.com/api/3/contact/sync`;

    const user = { contact: item };

    request(returnOption(apiKey, url, user), function (error, response, body) {

        if (error) throw error;
    
        var createdContact = JSON.parse(body);
        console.log(createdContact); 

        let fieldItem = { 
            fieldValue: {
                contact: createdContact.contact.id,
                field: fieldId,
                value: fieldValue
            }
        }

        url = `https://${domainName}.api-us1.com/api/3/fieldValues`;

        request(returnOption(apiKey, url, fieldItem), function (error, response, body) {
            if (error) throw error;

            var createdLink = JSON.parse(body);
            console.log(createdLink); 

            let automationValue = { 
                contactAutomation: {
                    contact: createdContact.contact.id,
                    automation: automationId
                }
            };

            url = `https://${domainName}.api-us1.com/api/3/contactAutomations`;

            request(returnOption(apiKey, url, automationValue), function (error, response, body) {
                if (error) throw error;
                
                var createdAutomation = JSON.parse(body);
                console.log(createdAutomation);
            });
        });
      });
}

module.exports = addContactAndAddCustomFieldAndAddToAutomation;