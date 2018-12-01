const request = require("request");

const domain = 'a definir';
let url = `https://${domain}.api-us1.com/api/3/contacts`;

const contact = {
    contact: {
        "email": "john@doo.fr",
        "firstName": "John",
        "lastName": "Doe",
        "phone": "7223224241"
    }
};

let options = { 
    headers: {
        'Api-Token': 'a definir'
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
