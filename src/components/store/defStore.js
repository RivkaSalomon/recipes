import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducer from './reducerUser'
import reduserRecipe from './reduserRecipe'
import { thunk } from 'redux-thunk'

const reducers = combineReducers({
    user: reducer,
    recipe: reduserRecipe,
})
const store = createStore(reducers, applyMiddleware(thunk));

export default store;