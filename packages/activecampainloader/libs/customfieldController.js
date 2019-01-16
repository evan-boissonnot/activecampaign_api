const senderFactory = require("./senderFactory");
const BaseController = require("./baseController");

class CustomFieldController extends BaseController {
    constructor(config) {
        super(config);
    }

    /// <summary>
    /// Create a new custom field
    /// WARNING : just creating a custom field, not ttached to a contact
    /// If you want to add the new custom field to a contact, use after addCustomFieldToContact
    /// </summary>
    addCustomField(item) {
        return senderFactory.getOne("addCustomField", this._config.domainName, this._config.token)
                                   .execute("fields", "POST", { field: item });
    }
}

module.exports = CustomFieldController;