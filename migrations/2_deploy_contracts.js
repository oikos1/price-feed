 var medianizer = artifacts.require("./Medianizer.sol");

module.exports = function(deployer) {
  deployer.deploy(medianizer);
};