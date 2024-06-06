const { Given, When, Then } = require('@cucumber/cucumber');
var expect = require('chai').expect;
const { By, Key, until } = require('selenium-webdriver');
const pet = require('../../page-objects/pet');
const data_generators = require('../../shared-objects/test-data/data_generators');

//Scenario: Add a new pet
Given('the pet does not exist in the system', async function(){
    this.petId = data_generators.idGenerator();
    var isPetIdAdded = await pet.checkPetExisted(this.petId);
    expect(isPetIdAdded).to.equal('Pet Not Found')
});

//Scenario: Add a new pet
When('a post request to add to the store is sent', async function(){
    this.petInfo = await pet.addNewPet(this.petId);
});

//Scenario: Add a new pet
Then('the pet should be added successfully', async function(){
    expect(this.petInfo.request.id).to.equal(this.petInfo.response.id)
    expect(this.petInfo.request.category.id).to.equal(this.petInfo.response.category.id)
    expect(this.petInfo.request.category.name).to.equal(this.petInfo.response.category.name)
    expect(this.petInfo.request.name).to.equal(this.petInfo.response.name)
    //expect(this.petInfo.request.photoUrls).to.equal(this.petInfo.response.photoUrls)
    //expect(this.petInfo.request.tags).to.equal(this.petInfo.response.tags)
    expect(this.petInfo.request.status).to.equal(this.petInfo.response.status)

});

//Scenario: Get a pet information
//Scenario: Find pet by status
//Scenario: Update pet information
//Scenario: Delete a pet
Given('the pet exists in the system', async function(){
    this.petInfo = await pet.addNewPet();
    this.petId = this.petInfo.request.id;
    var isPetIdAdded = await pet.checkPetExisted(this.petId);
    expect(isPetIdAdded).to.equal('Pet Existed')
});

//Scenario: Get a pet information
When('a get request to get pet information by petId is sent', async function(){
    this.latestPetInfo = await pet.getPetInfoById(this.petId);
});

//Scenario: Get a pet information
Then('the system should return the latest pet information', async function(){
    expect(this.latestPetInfo.id).to.equal(this.petId)
    expect(this.latestPetInfo.category.id).to.equal(this.petInfo.request.category.id)
    expect(this.latestPetInfo.category.name).to.equal(this.petInfo.request.category.name)
    expect(this.latestPetInfo.name).to.equal(this.petInfo.request.name)
    // expect(this.latestPetInfo.photoUrls).to.equal(this.petInfo.request.photoUrls)
    // expect(this.latestPetInfo.tags).to.equal(this.petInfo.request.tags)
    expect(this.latestPetInfo.status).to.equal(this.petInfo.request.status)
});

//Scenario: Find pet by status
Given('the pet exists in the system with status {string}', async function(status){
    this.status = status;
    this.petInfo = await pet.addNewPet(undefined, this.status);
    this.petId = this.petInfo.request.id;
    expect(this.petInfo.request.status).to.equal(this.status);
});

//Scenario: Find pet by status
When('a get request to get pets list by status is sent', async function(){
    this.petListByStatus = await pet.findPetByStatus(this.status);
});

//Scenario: Find pet by status
Then('the system should return the pet list matched with status {string}', async function(status){
    await pet.checkMatchedStatus(status, this.petListByStatus);
    var isPetIncluded = await pet.checkPetIncluded(this.petId, this.petListByStatus);
    expect(isPetIncluded).to.equal(true)
});

//Scenario: Update pet information
When('a post request to update pet information is sent', async function(){
    this.updateInfo = await pet.updatePetInfo(this.petInfo.request.id);
});

//Scenario: Update pet information
Then('the pet should be updated successfully', async function(){
    this.latestPetInfo = await pet.getPetInfoById(this.petInfo.request.id);
    expect(this.latestPetInfo.name).to.equal(this.updateInfo.request.name)
    expect(this.latestPetInfo.status).to.equal(this.updateInfo.request.status)
});


//Scenario: Delete a pet
When('a delete request to delete a pet is sent', async function(){
    this.response = await pet.deleteAPet(this.petId)
});

//Scenario: Delete a pet
Then('the pet should be removed from the system successfully', async function(){
    expect(this.response.message).to.equal(this.petId.toString());
});

//Scenario: Delete a pet
Then('the pet should be not found', async function(){
    var isPetIdAdded = await pet.checkPetExisted(this.petId);
    expect(isPetIdAdded).to.equal('Pet Not Found')
});




