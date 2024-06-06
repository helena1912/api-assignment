const pactum = require('pactum');

module.exports = {
  addPet: async function (petId, petName, categoryId, categoryName, photoUrls, tags, status) {
    var body = {
      "id": petId,
      "category": {
        "id": categoryId,
        "name": categoryName
      },
      "name": petName,
      "photoUrls": photoUrls,
      "tags": tags,
      "status": status
    }

    let response = await pactum.spec()
      .post(envData.baseUrl + "/pet")
      .withHeaders('Content-Type', 'application/json')
      .withJson(body)
      .withRequestTimeout(10000)
      .expectStatus(200);

    return {
      request: body,
      response: response.json
    };
  },

  findPetById: async function (petId) {
    let response = await pactum.spec()
      .get(envData.baseUrl + "/pet/" + petId)
      .withHeaders('Content-Type', 'application/json')
      .withRequestTimeout(10000)
    return response;
  },


  updatePetInfo: async function(petId, petName, status){
    
    let response = await pactum.spec()
      .post(envData.baseUrl + "/pet/" + petId)
      .withHeaders('Content-Type', 'application/x-www-form-urlencoded')
      .withForm({
        "name": petName,
        "status": status
      })
      .withRequestTimeout(10000)
      .expectStatus(200);

    return {
      request: {
        "name": petName,
        "status": status
      },
      response: response.json
    };
  },

  findPetByStatus: async function(status){
    let response = await pactum.spec()
      .get(envData.baseUrl + "/pet/findByStatus?status=" + status)
      .withHeaders('accept', 'application/json')
      .withRequestTimeout(10000)
      .expectStatus(200);

    return response
  },

  deletePet: async function(petId){
    let response = await pactum.spec()
        .delete(envData.baseUrl + '/pet/' + petId)
        .withHeaders('accept', 'application/json')
        .withRequestTimeout(10000)
        .expectStatus(200);

        return response.json
  }

  

  }
