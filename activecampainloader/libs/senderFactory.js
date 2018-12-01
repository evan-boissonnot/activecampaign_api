const Sender = require("./sender"); 
const OldV1Sender = require("./oldv1Sender"); 

// ALlows you to chosse the best version to send request to activecampaign api
class SenderFactory {
    constructor() {
        this._sendersByMethod = {}
        this._sendersByMethod["loadCampaigns"] = new Sender();
        this._sendersByMethod["addContact"] = new OldV1Sender();
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