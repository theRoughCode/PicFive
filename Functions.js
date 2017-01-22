var Clarifai = require('clarifai');
var fs = require('fs');

/*   FUNCTIONS EXPORTED
addConcepts(id, concepts) adds a concept (keyword) to the model specified by id
 \\ String, [String] -> Void

removeConcepts(id, concepts) removes a concept from the model.  If no concept specified, removes all concepts from model
 \\ String, [String] -> Void

getModel(id) outputs the list of concepts from the model to console
 \\ String -> Void

trainModel(id) trains model on given inputs
 \\ String -> Void

predictModel(id, url) produces a 2D array of [{keyword, confidence}] given an image url or image in base64
 \\ String, String -> Void

createModel(id, concepts) creates a new model with given id and concepts.
 \\ String, [String] -> Void

base64 (file) converts the image from specified file path to base-64
 \\ String -> String

  get_JSON(arr) parses a 2D array into a JSON object
   \\ 2D array -> JSON
*/

const src_dir = "src/";

// instantiate new Clarifai app
var app = new Clarifai.App(
  'esMd-gkPe7eqMBzbotXS-wSZmqcyb_P_kKfM7pHs',
  'yr3RWEHPdr1KauuBfkY1HimboDvKPV5ELktJEXlg'
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
    return app.models.initModel(id).then(
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

// Train model with given dataset
function trainModel(id) {
  initModel(id, train);
}

// Predict keywords and probability of url with model
function predictModel(id, url) {
  return initModel(id, predict, url);
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
function getModel(id) {
  app.models.get(id).then(
    function(response){
      getConcepts(response);
    },
    errorHandler
  );
}

// Model -> {Promise(Model, error)}
function getConcepts(model) {
  model.getOutputInfo().then(
    function (response) {
      console.log(response);
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

var k;

// after training the model, you can now use it to predict on other inputs
function predict(model, url) {
  return model.predict(url).then(
    function(response) {
      const outputs = [];
      var concepts;
      for (var i in response.outputs){
        concepts = response.outputs[i].data.concepts;
        var keywords = [];
        concepts.forEach(concept => keywords.push([concept.name, concept.value]));
        return keywords;
      }
    }, errorHandler
  );
}

// outputs errors
function errorHandler(err) {
  console.error(err);
}

// convert image to base 64
function base64(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString('base64');
}

function generateWords(){
  // https://github.com/first20hours/google-10000-english
  const filepath = src_dir + "wordbank.txt";
  var words = fs.readFileSync(filepath).toString('utf8').split("\n");
  words = words.filter(word => word.length > 2 && word.slice(-1) != 's');  // remove single and double letters
  var buzzwords = [];
  while(buzzwords.length < 5) {
    // Implement better randomizer
    var num = Math.floor(Math.random() * words.length);
    var buzz = words[num];
    var dup = buzzwords.reduce((x, y) => ((y === buzz) || x), false);
    if (!dup) buzzwords.push(buzz);
  }
  return buzzwords;
}

function is_NSFW(url){
  const confidence = predictModel(Clarifai.NSFW_MODEL, url);
}

// parses 2D array into JSON
function get_JSON(arr){
  var json = {};
  arr.forEach(x => {
    json[x[0]] = x[1];
  });
  return json;
}

// Functions exported
module.exports = {
  addConcepts,
  removeConcepts,
  getModel,
  trainModel,
  predictModel,
  createModel,
  base64,
  generateWords,
  get_JSON
}
