const Dogs = artifacts.require('Dogs');
const DogsUpdated = artifacts.require('DogsUpdated');
const Proxy = artifacts.require('Proxy');

module.exports = async function(deployer, network, accounts){
  //Deploy Contracts
  const dogs = await Dogs.new();
  const proxy = await Proxy.new(dogs.address);

  //Create Proxy Dog to Fool Truffle
  var proxyDog = await Dogs.at(proxy.address);

  //Set the nr of dogs through the proxy
  await proxyDog.setNumberOfDogs(10);

  //Tested
  var nrOfDogs = await proxyDog.getNumberOfDogs();
  console.log("Before update: " + nrOfDogs.toNumber());

  //Deploy new version of Dogs
  const dogsUpdated = await DogsUpdated.new();
  proxy.upgrade(dogsUpdated.address);

  //Fool truffle once again. It now thinks proxyDog has all functions.
  proxyDog = await DogsUpdated.at(proxy.address);
  //Initialize proxy state.
  proxyDog.initialize(accounts[0]);

  //Check so that storage remained
  nrOfDogs = await proxyDog.getNumberOfDogs();
  console.log("After update: " + nrOfDogs.toNumber());

  //Set the nr of dogs through the proxy with NEW FUNC CONTRACT
  await proxyDog.setNumberOfDogs(30);

  //Check so that setNumberOfDogs worked with new func contract.
  nrOfDogs = await proxyDog.getNumberOfDogs();
  console.log("After change: " + nrOfDogs.toNumber());


}
