# simulato release document

## Steps for core contributers to publish a new release of simulato

* Pull down and verify you have the most recent version of master
* Update the version number in the package.json using [semantic versioning](https://semver.org/)
* Verify the [CHANGELOG.md](./CHANGELOG.md) has the aggregated list of changes under the version number to which simulato is being updated
* Prepend the aggregated list of changes under the version number to docs/_pages/release-notes.md
* Delete package-lock.json and node_modules
* Run the command `npm install` to generate a new package-lock.json with the proper version
* Push any versioning update changes listed above to a branch titled the version number
* Follow PR process to have merged into master
* Confirm your registry is pointing to the default registry of `https://registry.npmjs.org/`
* Run the command [npm login](https://docs.npmjs.com/cli/adduser)
* Run the command [npm publish](https://docs.npmjs.com/cli/publish)
* Navigate to [releases](https://github.com/GannettDigital/simulato/releases) to create a new release
  * `Tag Version` Enter the package.json version prepended with v
    * Example v0.2.0
  * `Title` Enter the package.json version prepended with v
    * Example: v0.2.0
  * `Description` Enter the list summary found inside the [CHANGELOG.md](./CHANGELOG.md) for the release version.
    * Example:
      ```
        * Scott Gunther - Prepare code for open sourcing
        * Tom Dale - Fixed a bug where dataStore was not being cloned inside expected state
        * Scott Gunther - bumped simulato test site version, updated appveyor script for CI builds to run the test site in background
        * Tom Dale - Added component names in error messages when validating elements
        * Brian Fitzpatrick - Updated article text for more generic use```