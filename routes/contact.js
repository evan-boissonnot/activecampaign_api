const express = require("express");
const ApiActiveCampaign = require("../activecampainloader/libs/index").API;
const router = express.Router();

const activecampainAPI = new ApiActiveCampaign(process.env.ACTIVECAMPAIGN_DOMAIN, 
                                               process.env.ACTIVECAMPAIGN_TOKEN);

router.post('/', function(req, res, next) {
    let toBeAdded = req.body;
    let status = 422;
    let errorMessage = "";

    if(toBeAddedContact && toBeAddedContact.contact) {
        let fieldId = 0;
        let automationId = 0;
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
            isSuccess: false
        });
    }
});

module.exports = router;