import * as Actions from './action'

const initalseState = {
    user: null
}

const reducer = (state = initalseState, action) => {
    switch (action.type) {
        case Actions.SET_USER: {
            return ({ ...state, user: action.data })
        }
        default:
            {
                return { ...state }
            }
    }
}
export default reducer;
