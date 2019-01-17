
/// <summary>Use this class inside whole project</summary>
class Motor {
    constructor(logger) {
        this.configure();
        this._logger = logger;
    }

    /// Verify existing environment variable
    checkSetEnvironmentVariable(variableName) {
        let variable = process.env[variableName];
      
        if(! variable || variable == null || variable === "")
          throw new Error(`Environment variable ${variableName} not set`);
    }

    /// <summary>Run the motor </summary>
    run() {
        this.verifyExpectedValues();
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

module.exports = Motor;


