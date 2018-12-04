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
                            .execute("contact/sync", "POST", { contact: item });
    }

    // Get contact by id
    getContact(contactId) {
        return senderFactory.getOne("getContact", this._domainName, this._authToken)
                            .execute(`contacts/${contactId}`);
    }

    // Load all campaigns
    loadCampaigns() {
        return senderFactory.getOne("loadCampaigns", this._domainName, this._authToken)
                            .execute("campaigns");
    }    

    // Create a new custom field
    // WARNING : just creating a custom field, not ttached to a contact
    // If you want to add the new custom field to a contact, use after addCustomFieldToContact
    addCustomField(item) {
        return senderFactory.getOne("addCustomField", this._domainName, this._authToken)
                                   .execute("fields", "POST", { field: item });
    }

    // Add an existing custom field to an existing contact
    addCustomFieldToContact(contactId, customFieldId, value) {
        console.log('======= addCustomFieldToContact =========');
        return senderFactory.getOne("addCustomFieldToContact", this._domainName, this._authToken)
                                   .execute("fieldValues", "POST", 
                                   { 
                                       fieldValue: {
                                           contact: parseInt(contactId),
                                           field: parseInt(customFieldId),
                                           value: value
                                       }
                                   });
    }

    // Create a new contact and add new custom field to him, 
    // and after, add the contact to automation
    addContactWithCustomFieldToAutomation(contact, fieldId, fieldValue, automationId) {
        const contactPromise = this.addContact(contact);

        console.log('======= addContactWithCustomFieldToAutomation =========');

        contactPromise.then((contactResult) => this.addCustomFieldToContact(contactResult.contact.id, fieldId, fieldValue));
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

    // Add a contact to automation
    addContactToAutomation(contact, automationId, isCreatingContact=true) {
        var contactPromise = null;

        if(isCreatingContact)
            contactPromise = this.addContact(contact);
        else
            contactPromise = this.getContact(contact.id);

        console.log(contactPromise);

        return contactPromise.then((contactResult) => {
            return senderFactory.getOne("addContactToAutomation", this._domainName, this._authToken)
                                .execute("contactAutomations", "POST", 
                                        { 
                                            contactAutomation: {
                                                contact: contactResult.contact.id,
                                                automation: automationId
                                            }
                                        });
        });
    }
}

module.exports = Api;
