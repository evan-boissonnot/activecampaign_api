
/// <summary>Use this class inside whole project</summary>
class Motor {
    constructor() {
        this.configure();
        this._logger = null;
    }

    /// Verify existing environment variable
    checkSetEnvironmentVariable(variableName) {
        let variable = process.env[variableName];
      
        if(! variable || variable == null || variable === "")
          throw new Error(`Environment variable ${variableName} not set`);
    }

    /// <summary>Run the motor </summary>
    run(logger) {
        this.verifyExpectedValues();
        this._logger = logger;
    }

    /// <summary>Verify expected values</summary>
    verifyExpectedValues() {
        this.checkSetEnvironmentVariable("ACTIVECAMPAIGN_DOMAIN");
        this.checkSetEnvironmentVariable("ACTIVECAMPAIGN_TOKEN");
    }

    configure() {
    }

    /*
    * Log error with current logger
    */
    logError(message, obj = null) {
        this._logger.error(message, obj);
    }
}

module.exports = new Motor();


