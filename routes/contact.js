//const API = require('../activecampainloader/libs/index').API;
const express = require("express"); 
//const config = require('config');
const router = express.Router();


router.post('/', function(req, res, next) {
    let toBeAddedContact = req.body;
    let status = 422;

    //console.log(config.api.activecampaign.key);

    if(toBeAddedContact && toBeAddedContact.email) {
        status = 200;

        
    }

    res.status(status).send({
        item: toBeAddedContact,
        isSuccess: status == 200
    });
});

module.exports = router;