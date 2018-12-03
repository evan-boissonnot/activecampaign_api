const Sender = require("./sender"); 
const OldV1Sender = require("./oldv1Sender"); 

// ALlows you to chosse the best version to send request to activecampaign api
class SenderFactory {
    constructor() {
        const lastVersionSender = new Sender();

        this._sendersByMethod = {}
        this._sendersByMethod["loadCampaigns"] = lastVersionSender;
        this._sendersByMethod["addContact"] = lastVersionSender;
        this._sendersByMethod["addContactToAutomation"] = lastVersionSender;
    }

    // Returns the best sender to request activecampaign api
    getOne(methodName, domainName, token) {
        let sender = this._sendersByMethod[methodName]; 

        sender.setDomainName(domainName);
        sender.setAuthentcateToken(token);

        return sender;
    }
}

module.exports = new SenderFactory();