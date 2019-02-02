const Sender = require("./sender");

///
class OldV1Sender extends Sender {
    constructor() {
        super();
    }

    prepareUrl(endOfUrl) {
        return `http://${this._domainName}.activehosted.com/admin/api.php`;
    }

    _baseExecute(options, resolve, reject) {
        console.log("_base");
    }
}

module.exports = OldV1Sender;