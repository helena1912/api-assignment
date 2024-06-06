const pet_apis = require("../shared-objects/apis/pet_apis")
const data_generators = require("../shared-objects/test-data/data_generators")
var expect = require('chai').expect;

module.exports = {
    addNewPet: async function(id, status){
        var petId = id == undefined ? data_generators.idGenerator() : id;
        var categoryId = data_generators.idGenerator();
        var petName = data_generators.nameGenerator('Pet');
        var categoryName = data_generators.nameGenerator('Cat');
        var tags = data_generators.tagsGenerator(3);
        var photoUrls = data_generators.photoGenerator(3);
        var details = await pet_apis.addPet(petId, petName, categoryId, categoryName, photoUrls, tags, status == undefined ? "available" : status)
        console.log('added new pet')
        return details;
    },

    checkPetExisted: async function (petId){
        var getPet = await pet_apis.findPetById(petId);
        var statusCode = getPet.statusCode
        var status;
        switch(statusCode){
            case 404: 
            status = 'Pet Not Found';
            break;
            case 200:
            status = 'Pet Existed';
            break;
            default:
            status = 'Unknown';
        }
        return status;
    },

    getPetInfoById: async function(petId) {
        var getPet = await pet_apis.findPetById(petId);
        var petInfo = getPet.json
    
        return petInfo

    },

    updatePetInfo: async function(petId) {
        var petName = data_generators.nameGenerator('Pet');
        var status = data_generators.randomStatus();
        var details = await pet_apis.updatePetInfo(petId, petName, status)
        console.log('updated pet')
        return details
    },

    findPetByStatus: async function(status){
        var petList = await pet_apis.findPetByStatus(status)
        return petList.json
    },

    checkMatchedStatus: async function(status, petList){
       var totalItems = petList.length;
       function condition(result){
            return result.status === status
       }

       var totalItemsMatched = petList.filter(condition);
       
       expect(await totalItemsMatched.length).to.equal(await totalItems)
    },

    checkPetIncluded: async function(petId, petList){
       for (i = 0; i < petList.length; i++){
        if (petList[i].id == petId){
            return true;
        }
       }
       return false
    },


    deleteAPet: async function (petId){
        var message = await pet_apis.deletePet(petId);
        console.log('deleted pet')
        return message
    }




}

