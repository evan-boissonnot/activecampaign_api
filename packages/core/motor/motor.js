/// <summary>Use this class inside whole project</summary>
class Motor {

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
}

module.exports = new Motor();


