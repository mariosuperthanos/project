// Tips:
// I used MVC pattern(MODEL VIEW CONTROLLER)
// model gets the DATA 
// view prints the data
// controller handles events and combine the informations from model and view

// model: it gets the data from a public API and the interpret it in a better looking way and it also catches the errors

// view: it is a folder with more js files that MODIFY DOM
//  recipeView: it has a class 'RecipeView'. It has some variables: -#parentElement that has the location to insert the HTML code to modify DOM) and -data that stores the data from model
//  It has a private function for every SMALL task, so the code looks cleaner
//  These functions are called and combined in render method, so it looks more clearly in the controller

//   config: It stores the special variables, so we DON'T have to modify them in more DIFFERENT PLACES

// helpers: It stores functions that we use more times in code:
      // we have a special function that sent a rejected promise after a certain amount of time
      // and a function that verify if the fetch's promise is fulfiled in the certain AMOUNT OF TIME and if it's ok

// controller: it gets the data from MODEL and desplays it using the code from VIEW
// I used publisher-subscriber pattern and i explained it








import * as model from './model.js';
// console.log(model.state);
// import icons from '../img/icons.svg'; // Parcel 
import searchView from './views/searchView.js';
import recipeView from './views/recipeView.js';
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import { forEach } from 'core-js/core/array';


///////////////////////////////////////

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipies = async function() {
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();
    // 1) Loading recipe
    await model.loadRecipe(id);
    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch(err){
    // alert(err)
    // this function has to a method because we SHOULDN'T use and MANIPULATE DOM elements in the controller
    recipeView.stopSpinner();
    recipeView.renderError();
  }
};

controlRecipies();

const controlSearchResults = async function(){
  try{
    console.log(1);
    // 1) Get search query
    const query = searchView.getQuery();
    if(!query) return;


    // 2) Load search
    await model.loadSearchResults(query);
    // 3 Render results
    console.log(model.state.search.results);
  } catch(err) {
    console.log(err);
  }
};

// Publisher - subscriber pattern:
// We want the subscriber(controlRecipies) to be connected to the event handler function - the publisher - addHandlerRender
// So the subscriber has to be in the controller.js and the publisher has to be in recipeView.js
// window.addEventListener('hashchange', controlRecipies);

const init = function() {
  recipeView.addHandlerRender(controlRecipies);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
