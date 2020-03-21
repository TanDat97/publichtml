// Global app controller
import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'


import {
  elements,
  renderLoader,
  clearLoader
} from './views/base'
/*
- search object
- current recipe object
- shopping list object
- liked recipes
*/

const state = {}

/** 
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1 get query from view
  const query = searchView.getInput()

  if (query) {
    // 2 new search object and add to state
    state.search = new Search(query)

    // 3 prepare UI for result
    searchView.clearInput()
    searchView.clearResults()
    renderLoader(elements.searchResList)

    try {
      // 4 search for recipe
      await state.search.getResults()

      // 5 render result on UI
      clearLoader()
      searchView.renderResults(state.search.result)
    } catch (err) {
      alert('Something wrong with the search...');
      clearLoader();
    }
  }

}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault()
  controlSearch()
})

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline')
  console.log(e.target)
  if (btn) {
    const gotoPage = parseInt(btn.dataset.goto, 10)
    searchView.clearResults()
    searchView.renderResults(state.search.result, gotoPage)
    console.log(gotoPage)
  }
})

/** 
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '')
  if (id) {
    // prepare UI for change
    recipeView.clearRecipe()
    renderLoader(elements.recipe)

    // highlight selected search item
    if (state.search) {
      searchView.highlightSelected(id)
    }

    // create new recipe object
    state.recipe = new Recipe(id)

    try {
      // get recipe data and parse ingredients
      await state.recipe.getRecipe()
      state.recipe.parseIngredients()

      // calculate serving and time
      state.recipe.calcTime()
      state.recipe.calcServings()

      //render recipe
      clearLoader()
      recipeView.renderRecipe(state.recipe)

    } catch (err) {
      console.log(err);
      alert('Error processing recipe!');
    }

  }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))

/** 
 * LIST CONTROLLER
 */
const controlList = () => {
  // Create a new list IF there in none yet
  if (!state.list) state.list = new List()

  // Add each ingredient to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient)
    listView.renderItem(item)
  })
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // Handle the delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from state
    state.list.deleteItem(id)
    // Delete from UI
    listView.deleteItem(id)

    // Handle the count update
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10)
    state.list.updateCount(id, val)
  }
})

// handle recipe button click
elements.recipe.addEventListener('click', event => {
  if (event.target.matches('.btn-decrease, .btn-decrease *')) {
    //decrease button clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec')
      recipeView.updateServingsIngredients(state.recipe)
    }
  } else if (event.target.matches('.btn-increase, .btn-increase *')) {
    //increase button clicked
    state.recipe.updateServings('inc')
    recipeView.updateServingsIngredients(state.recipe)
  } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add ingredients to shopping list
    controlList()
  }
})



function ajax(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(this.responseText);
    };
    xhr.onerror = reject;
    xhr.open('GET', url);
    xhr.send();
  });
}