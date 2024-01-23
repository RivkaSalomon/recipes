import axios from "axios";

export const getRecipes = () => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/recipe`)
            .then(x => {
                dispatch({ type: 'SET_RECIPE', data: x.data })
                console.log(x.data)
            }
            )
            .catch(err => console.error(err))
}
export const editRecipe = (recipe) => {
    alert("fhj");
    return dispatch => axios.post(`http://localhost:8080/api/recipe/edit`, recipe)
        .then(x => {
            dispatch({ type: 'EDIT_RECIPE', data: x.data })
        })
        .catch(err => console.error(err));
}

export const deleteRecipe = (RecipeId) => {
    console.log("k")
    return dispatch =>
        axios.post(`http://localhost:8080/api/recipe/delete/:${RecipeId}`)
            .then(() => dispatch({ type: 'DELETE_RECIPE', data: RecipeId }))
            .catch(err => console.error(err));

}

export const addRecipe = (recipe) => {

    return dispatch => {
        axios.post(`http://localhost:8080/api/recipe`, recipe)
            .then(x => {
                dispatch({ type: 'ADD_RECIPE', data: x.data })
            })
            .catch(err => console.error(err));
    }
}