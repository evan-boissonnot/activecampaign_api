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

    // Get contact by id
    getContact(contactId) {
        throw new Exception();
    }

    // Load all campaigns
    loadCampaigns() {
        return senderFactory.getOne("loadCampaigns", this._domainName, this._authToken)
                            .execute("campaigns");
    }    

    // Add a contact to automation
    addContactToAutomation(contact, automationId, isCreatingContact=true) {
        var contactPromise = null;

        if(isCreatingContact)
            contactPromise = this.addContact(contact);
        else
            contactPromise = this.getContact(contact.id);

        contactPromise.then((contactResult) => {
            senderFactory.getOne("addContactToOneAutomation", this._domainName, this._authToken)
                         .execute("contactAutomations", "POST", 
                                  { 
                                      contact: contactResult.id,
                                      automation: automationId
                                  });
        });
    }
}

module.exports = Api;
