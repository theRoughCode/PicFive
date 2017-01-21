var Clarifai = require('clarifai');

//  ~~~~~~~~~~~~~~~~~  Prediction Models  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const GENERAL = Clarifai.GENERAL_MODEL;  // Wide range of tags
const FOOD = Clarifai.FOOD_MODEL; // Identifies food ingredients and dish
const TRAVEL = Clarifai.TRAVEL_MODEL; // Identifies specific features of residential, hotel and travel related properties
const NSFW = Clarifai.NSFW_MODEL;  // likelihood image contains pornography
const WEDDINGS = "c386b7a870114f4a87477c0824499348"; // includes brides, grooms, dresses, flowers, etc
const PETS = "pets";
const PETSID = "petsID";
const TEST = "test";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

module.exports = {
  GENERAL,
  FOOD,
  TRAVEL,
  NSFW,
  WEDDINGS,
  PETS,
  PETSID,
  TEST
}
