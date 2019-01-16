const senderFactory = require("./senderFactory");
const BaseController = require("./baseController");

class ContactController extends BaseController {
    constructor(config) {
        super(config);
    }

    // Sends new request to add new contact, with email required
    addContact(item) {
        console.log('1. ======= addContact =========');
        return senderFactory.getOne("addContact", this._config.domainName, this._config.token)
                            .execute("contact/sync", "POST", { contact: item });
    }

    // Get contact by id
    getContact(contactId) {
        return senderFactory.getOne("getContact", this._config.domainName, this._config.token)
                            .execute(`contacts/${contactId}`);
    }

    addContactToAutomation(contact, automationId, isCreatingContact=true) {
        var contactPromise = new Promise( () => {});

        if(isCreatingContact)
            contactPromise = this.addContact(contact);

        console.log(contactPromise);

        return contactPromise.then((contactResult) => {
            return senderFactory.getOne("addContactToAutomation", this._config.domainName, this._config.token)
                                .execute("contactAutomations", "POST", 
                                        { 
                                            contactAutomation: {
                                                contact: contactResult.contact.id,
                                                automation: automationId
                                            }
                                        });
        });
    }

    addCustomFieldToContact(contactId, field) {
        console.log('2. ======= addCustomFieldToContact =========');
        console.log('====> this._config.domainName : ' + this._config.domainName);
        console.log('====> this._config.token : ' + this._config.token);

        return senderFactory.getOne("addCustomFieldToContact", this._config.domainName, this._config.token)
                                   .execute("fieldValues", "POST", 
                                   { 
                                       fieldValue: {
                                           contact: parseInt(contactId),
                                           field: parseInt(field.id),
                                           value: field.value
                                       }
                                   });
    }

    /// <summary>Create a contact (with adding field value) and add this contact to a list</summary>
    addContactInList(contact, list, field) {
        console.log('300. ======= addContactInList =========');
        const ADDING_STATE = 1;
        const contactPromise = this.addContact(contact); 

        console.log("--> BEFORE addCustomFieldToContact");
        contactPromise.then((contactResult) => this.addCustomFieldToContact(contactResult.contact.id, field));

        console.log('400. ======= addContactToList ========');
        contactPromise.then((contactResult) => senderFactory.getOne("addContactToList", this._config.domainName, this._config.token)
                                                            .execute("contactLists", "POST", 
                                                                    { 
                                                                        contactList: {
                                                                            list: parseInt(list.id),
                                                                            contact: parseInt(contactResult.contact.id),
                                                                            status: ADDING_STATE
                                                                        }
                                                                    }));

    }
}

module.exports = ContactController;