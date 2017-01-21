var Clarifai = require('clarifai');

//i instantiate new Clarifai app
var app = new Clarifai.App(
  'esMd-gkPe7eqMBzbotXS-wSZmqcyb_P_kKfM7pHs',
  'yr3RWEHPdr1KauuBfkY1HimboDvKPV5ELktJEXlg'
);

// predict contents of image
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
  function (response) {
    //console.log("Predict:");
    const concepts = response.outputs[0].data.concepts;
    //concepts.forEach(concept => console.log(concept.name));
  },
  function (err) {
    console.error(err);
  }
);

// Produces list of images trained
/*app.inputs.list().then(
  function(response) {
    const inputs = [];
    for(var key in response){
      var value = response[key];
      inputs.push(value);
    }
    inputs.forEach(input => {
      //console.log(input);
      console.log(input.rawData.data.image.url);
      console.log("\n");
    });
  },
  function(err) {
    console.error(err);
  }
);*/

// add inputs
/*app.inputs.create("https://samples.clarifai.com/metro-north.jpg").then(
  searchForDog,
  function (err) {
    console.error(err);
  }
);*/

// search for concepts
function searchForDog (response) {
  console.log(response);
  /*app.inputs.search([{
    name: dog
  }]).then(
    function (response) {
      console.log("Search: ");
      console.log(response);
    },
    function(err){
      console.error(err);
    }
  );*/
}

// add inputs with concepts
/*app.inputs.create([{
  "url": "https://samples.clarifai.com/dog1.jpeg",
  "concepts": [
    { "id": "cat", "value": false },
    { "id": "dog", "value": true }
  ]
}, {
  "url": "https://samples.clarifai.com/dog2.jpeg",
  "concepts": [
    { "id": "cat", "value": false },
    { "id": "dog", "value": true }
  ]
}, {
  "url": "https://samples.clarifai.com/cat1.jpeg",
  "concepts": [
    { "id": "cat", "value": true },
    { "id": "dog", "value": false }
  ]
}, {
  "url": "https://samples.clarifai.com/cat2.jpeg",
  "concepts": [
    { "id": "cat", "value": true },
    { "id": "dog", "value": false }
  ]
}]).then(
  createModel,
  errorHandler
);*/

// search
/*app.inputs.search({name: 'dog'}).then(
  function(response) {
    const hits = response.rawData.hits;
    hits.forEach(hit => {
      const url = hit.input.data.image.url;
      const concepts = hit.input.data.concepts;
      //concepts.forEach(concept => console.log(concept));

      console.log(hit.input.data.image);
    });
    console.log(hits[0].input.data);
  },
  function(err) {
    console.error(err);
  }
);*/

// list training models
function getModels() {
  const names = []
  app.models.list().then(
    function(response){
      response.rawData.forEach(model => names.push({name: model.name, id: model.id}));
      console.log(names);
      return names;
    },
    errorHandler
  );
}


// once inputs are created, create model by giving name and list of concepts
function createModel(id, concepts) {
  app.models.create(id, concepts).then(
    trainModel,
    errorHandler
  );
}

// Add concepts to a model
function initModel(id, fn) {
  app.models.initModel(id).then(
    fn,
    errorHandler
  );
}

function updaateModel (id, concepts) {
  app.models.initModel(id).then(function(model) {
    addConcepts,
    errorHandler
  });
}

// Model -> Void
function addConcepts(model) {
  console.log(model.id);
  model.mergeConcepts([{ "id": "rainbow"}]).then(
    function(response) {
      console.log(response);
    },
    function(err){
      console.error(err);
    }
  );
}

// Model -> Void
function removeConcepts(model) {
  model.deleteConcepts({"id": "boscoe"}).then(
     function(response) {
       console.log(response);
     },
     errorHandler
   );
}


// string -> {Promise(Model, error)}
function getModel(model) {
  app.models.get(model).then(
    function(response){
      console.log(response);
    },
    errorHandler
  );
}

// (string | Model) -> {Promise(Model, error)}
function getModelConcepts(model) {
  model.getOutputInfo().then(
    function (response) {
      const data = response.outputInfo.data.concepts;
      const concepts = [];
      data.forEach(concept => concepts.push(concept.name));
      console.log(concepts);
    },
    errorHandler
  );
}
//getModels();
/*createModel("petsID", [
  { "id": "boscoe" }
]);*/
/*app.models.initModel("petsID").then(function(model){
  updateModel,
  errorHandler
});*/
//updateModel("petsID", [{"id": "boscoe2"}]);


// after model is created, you can now train the model
// Model -> Void
function trainModel(model) {
  model.train().then(
    function (model) {
      console.log(model);
    },
    errorHandler
  );
}

  // after training the model, you can now use it to predict on other inputs
function predictModel(model) {
  model.predict('https://s-media-cache-ak0.pinimg.com/originals/64/8c/18/648c189bba2eac70e2700f15d7452b8c.jpg').then(
    function(response) {
      const outputs = [];
      var concepts;
      var keywords = [];
      for (var i in response.outputs){
        concepts = response.outputs[i].data.concepts;
        keywords = [];
        concepts.forEach(concept => keywords.push([concept.name, concept.value]));
        console.log(keywords);
      }
    }, errorHandler
  );
}

// outputs errors
function errorHandler(err) {
  console.error(err);
}
/*app.models.predict("pets", 'https://samples.clarifai.com/dog3.jpeg').then(
  function(response) {
    const outputs = [];
    var concepts;
    var keywords = [];
    for (var i in response.outputs){
      concepts = response.outputs[i].data.concepts;
      keywords = [];
      concepts.forEach(concept => keywords.push([concept.name, concept.value]));
      console.log(keywords);
    }
  },
  function(err) {
    console.error(err);
  }
);*/
initModel("test",predictModel);
