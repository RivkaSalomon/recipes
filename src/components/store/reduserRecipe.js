const initalseState = {
    recipe: [],
    rSelected: null
}

const reducer = (state = initalseState, action) => {
    switch (action.type) {
        case "SET_RECIPE":
            return { ...state, recipe: action.data }
        case "ADD_RECIPE":
            let recipes = [...state.recipe];
            recipes.push(action.data);
            return { ...state, recipes }
        case "EDIT_RECIPE": {
            const recipe = [...state.recipe];
            const findIndex = recipe.findIndex(x => x.Id == action.data.Id);
            recipe[findIndex] = action.data;
            return { ...state, recipe }
        }
        case "DELETE_RECIPE": {
            console.log("d")
            let recipe = [...state.recipe];
            recipe = recipe.filter(x => x.Id !== action.data.Id);
            return { ...state, recipe }
        }
        case "SET_SELECTED_RECIPE":
            {
                return ({
                    ...state,
                    rSelected: action.data
                })
            }
        default: return { ...state }
    }
}


export default reducer;