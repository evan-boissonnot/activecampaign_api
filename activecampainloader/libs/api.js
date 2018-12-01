const senderFactory = require("./senderFactory");

// Api to request ActiveCampaign api
class Api {
    constructor(domainName, authToken) {
        this._domainName = domainName;
        this._authToken = authToken;
    }
    
    // Sends new request to add new contact, with email required
    addContact(item) {
        return senderFactory.getOne("addContact", this._domainName, this._authToken)
                            .execute("contacts", "POST", { contact: item });
    }

    // Load all campaigns
    loadCampaigns() {
        return senderFactory.getOne("loadCampaigns", this._domainName, this._authToken)
                            .execute("campaigns");
    }    
}

module.exports = Api;
