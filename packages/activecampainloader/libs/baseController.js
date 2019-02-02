/// <summary>Non instanciable class : base of the access controllers</summary>
class BaseController {
    constructor(config) {
        this._config = config;
    }
}

module.exports = BaseController;