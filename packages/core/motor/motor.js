/// <summary>Use this class inside whole project<summary>
class Motor {

    /// Verify existing environment variable
    checkSetEnvironmentVariable(variableName) {
        let variable = process.env[variableName];
      
        if(! variable || variable == null || variable === "")
          throw new Error(`Environment variable ${variableName} not set`);
      }
}

module.exports = new Motor();


