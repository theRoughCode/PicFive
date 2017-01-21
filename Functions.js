var Clarifai = require('clarifai');


// instantiate new Clarifai app
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
    train,
    errorHandler
  );
}

function initModel(id, fn, param) {
  if (param){
    app.models.initModel(id).then(
      x => fn(x, param),
      errorHandler
    )
  } else {
    app.models.initModel(id).then(
      fn,
      errorHandler
    );
  }
}

// Add concepts to a model
function addConcepts(id, concepts) {
  initModel(id, addConceptsToModel);
}

// Remove concepts to a model
function removeConcepts(id, concepts) {
  initModel(id, removeConceptsFromModel, concepts)
}

// Get concepts from a model
function getModelConcepts(id) {
  initModel(id, getConcepts);
}

// Train model with given dataset
function trainModel(id) {
  initModel(id, train);
}

// Predict keywords and probability of url with model
function predictModel(id, url) {
  initModel(id, predict, url);
}

// Model -> Void
function addConceptsToModel(model, concepts) {
  model.mergeConcepts(concepts).then(
    function(response) {
      console.log(response);
    },
    function(err){
      console.error(err);
    }
  );
}

// Model -> Void
function removeConceptsFromModel(model) {
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
function getConcepts(model) {
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

// after model is created, you can now train the model
// Model -> Void
function train(model) {
  model.train().then(
    function (model) {
      console.log(model);
    },
    errorHandler
  );
}

  // after training the model, you can now use it to predict on other inputs
function predict(model, url) {
  model.predict(url).then(
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


module.exports = {
  addConcepts,
  removeConcepts,
  getModelConcepts,
  trainModel,
  predictModel,
  createModel
}
