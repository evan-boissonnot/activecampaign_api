const request = require("request");

const domain = 'a définir';
let url = `https://${domain}.api-us1.com/api/3/contactAutomations`;

const contact = {
    contactAutomation: {
        contact: 12345,
        automation: 657
    }
};

let options = { 
    headers: {
        'Api-Token': 'a définir'
    },
    method: 'POST',
    url: url,
    body: JSON.stringify(contact)
};

request(options, function (error, response, body) {

    if (error) throw error;

    var resultAsJson = JSON.parse(body);
    console.log(resultAsJson); 
  });
