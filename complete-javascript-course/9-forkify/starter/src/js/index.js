// Global app controller
import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base'
/*
- search object
- current recipe object
- shopping list object
- liked recipes
*/

const state = {}

const controlSearch = async () => {
  // 1 get query from view
  const query = searchView.getInput()

  if(query){
    // 2 new search object and add to state
    state.search = new Search(query)

    // 3 prepare UI for result
    searchView.clearInput()
    searchView.clearResults()
    renderLoader(elements.searchResList)

    // 4 search for recipe
    await state.search.getResults()

    // 5 render result on UI
    clearLoader()
    searchView.renderResults(state.search.result)
  }
  
} 

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault()
  controlSearch()
})
