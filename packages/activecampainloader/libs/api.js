const senderFactory = require("./senderFactory");
const ContactController = require('./contactController');
const CustomFieldController = require('./customfieldController');

// Api to request ActiveCampaign api
class Api {
    constructor(domainName, authToken) {
        this._domainName = domainName;
        this._authToken = authToken;

        const config = { domainName: domainName, token: authToken };

        this._contact = new ContactController(config);
        this._customField = new CustomFieldController(config);
    }
    
    // Sends new request to add new contact, with email required
    addContact(item) {
        return this._contact.addContact(item);
    }

    // Get contact by id
    getContact(contactId) {
        return this._contact.getContact(contactId);
    }

    // Load all campaigns
    loadCampaigns() {
        return senderFactory.getOne("loadCampaigns", this._domainName, this._authToken)
                            .execute("campaigns");
    }    

    // Create a new custom field
     addCustomField(item) {
        return this._customField.addCustomField(item);
    }

    // Add an existing custom field to an existing contact
    addCustomFieldToContact(contactId, field) {
        return this._contact.addCustomFieldToContact(contactId, field);
    }

    // Create a new contact and add new custom field to him, 
    // and after, add the contact to automation
    addContactWithCustomFieldToAutomation(contact, field, automationId) {
        console.log('0. ======= addContactWithCustomFieldToAutomation =========');

        const contactPromise = this.addContact(contact);        

        // test : https://github.com/ActiveCampaign/activecampaign-api-nodejs/issues/39 ??

        contactPromise.then((contactResult) => this.addCustomFieldToContact(contactResult.contact.id, field));
        contactPromise.then((contactResult) => senderFactory.getOne("addContactToAutomation", this._domainName, this._authToken)
                                                            .execute("contactAutomations", "POST", 
                                                                    { 
                                                                        contactAutomation: {
                                                                            contact: contactResult.contact.id,
                                                                            automation: automationId
                                                                        }
                                                                    }));

        return contactPromise;
    }

    /// <summary>Create a contact (with adding field value) and add this contact to a list</summary>
    addContactInList(contact, list, field) {
        return this._contact.addContactInList(contact, list, field);
    }

    // Add a contact to automation
    addContactToAutomation(contact, automationId, isCreatingContact=true) {
        return this._contact.addContactToAutomation(contact, automationId, isCreatingContact);
    }
}

module.exports = Api;
