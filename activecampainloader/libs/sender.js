const request = require("request");

// ActiveCampaign Sender
class Sender {
    constructor() {
        this._domainName = '';
        this._authToken = '';
    }

    setDomainName(value) {
        this._domainName = value;
    }

    setAuthentcateToken(value) {
        this._authToken = value;
    }

    prepareOptions(endOfUrl, methodType="GET", item) {
        return { 
            headers: {
                'Api-Token': this._authToken
            },
            method: methodType,
            url: this.prepareUrl(endOfUrl),
            form: item ? JSON.stringify(item) : ''
        };
    }

    prepareUrl(endOfUrl) {
        var url = `https://${this._domainName}.api-us1.com/api/3/${endOfUrl}`;

        return url;
    }

    execute(entity, methodType="GET", item) {
        var self = this;
        return new Promise(function(resolve, reject) {
            if(methodType === "GET")
                self._executeGet(self, entity, resolve, reject);
            else if(methodType == "POST")
                self._executePost(self, entity, item, resolve, reject);
            else 
                reject("method type not exists");
        });
    }

    _executePost(self, entity, item, resolve, reject) {
        var options = self.prepareOptions(entity, "POST", item);

        this._baseExecute(options, resolve, reject);
    }

    _executeGet(self, entity, resolve, reject) {
        var options = self.prepareOptions(entity, "GET");

        this._baseExecute(options, resolve, reject);
    }

    _baseExecute(options, resolve, reject) {
        request(options, function (error, response, body) {
            if (error) reject(error);

            console.log("BEGIN------_baseExecute-----");
            console.log(">> OPTIONS");
            console.log(options);

            var resultAsJson = JSON.parse(body);
            console.log(">> RESULT");
            console.log(resultAsJson);

            console.log("END ------_baseExecute-----");
            resolve(resultAsJson); 
          });
    }
}

module.exports = Sender;