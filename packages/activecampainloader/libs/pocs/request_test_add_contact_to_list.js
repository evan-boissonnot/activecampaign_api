const request = require("request");

const domain = 'a definir';
const token = 'a definir';

const listId = 0;
const contactId = 0;
const ADDING_STATE = 1;

let url = `https://${domain}.api-us1.com/api/3/contactLists`;

const contact = {
    "contactList": {
        "list": listId,
        "contact": contactId,
        "status": ADDING_STATE
    }
};

let options = { 
    headers: {
        'Api-Token': token
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
