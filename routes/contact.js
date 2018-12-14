
const express = require("express");
const ApiActiveCampaign = require("../packages/activecampainloader/libs/index").API;
const router = express.Router();
const config = require('config');
const AUTOMATION_ID_KEY = "api.activecampaign.automation.id";
const AUTOMATION_FIELD_ID_KEY = "api.activecampaign.automation.fieldId";

if (! config.has(AUTOMATION_ID_KEY)) {
    throw new Error("AUTOMATION ID not define in configuration");
}

if (! config.has(AUTOMATION_FIELD_ID_KEY)) {
    throw new Error("AUTOMATION FIELD ID not define in configuration");
}

const activecampainAPI = new ApiActiveCampaign(process.env.ACTIVECAMPAIGN_DOMAIN, 
                                               process.env.ACTIVECAMPAIGN_TOKEN);


router.post('/', function(req, res, next) {
    let toBeAdded = req.body;
    let status = 422;
    let errorMessage = "";

    console.log("contact/index");
    console.log(toBeAdded);

    if(toBeAdded && toBeAdded.contact && toBeAdded.contact.email) {
        let fieldId = config.get(AUTOMATION_FIELD_ID_KEY);
        let automationId = config.get(AUTOMATION_ID_KEY);

        console.log("fieldId : " + fieldId);
        console.log("automationId : " + automationId);

        activecampainAPI.addContactWithCustomFieldToAutomation(toBeAdded.contact, 
                                                               fieldId, 
                                                               toBeAdded.url,
                                                               automationId)
                        .then((result) => {
                            res.status(200).send({
                                item: result,
                                isSuccess: true
                            });
                        });
    } else {
        res.status(status).send({
            item: null,
            isSuccess: false,
            message: "bad content"
        });
    }
});

module.exports = router;