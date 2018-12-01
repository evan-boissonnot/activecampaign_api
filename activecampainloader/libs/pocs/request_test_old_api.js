const request = require("request");

const domain = 'test';
let url = `http://${domain}.activehosted.com/admin/api.php`;

const key = '';
url = url + `?api_key=${key}&api_action=campaign_send`;

const email = '';
url = url + `&api_output=json&email=${email}`;

const campaignId = 0;
url = url + `&campaign_id=${campaignId}`;

url = url + "&type=html";

const action = 'test';
url = url + `&action=${action}`;

let options = { 
    method: 'POST',
    url: url,
};

// 01/12/2018
//j'ajoute mon contact, et je lui définis une url, dans son custom fields, qui sera binder automatiquement
// lors de l'ajout dans la liste avec l'automation

request(options, function (error, response, body) {
    if (error) throw error;

    var resultAsJson = JSON.parse(body);
    console.log(resultAsJson); 
  });
