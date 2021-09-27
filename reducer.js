export const initialState = {
    user: null,
};

export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,  // Keep everything that was already in there
                user: action.user,// But change the user to be whatever we dispatched. That is whatever is in there for the "user" section of the object we dispatched
            };
        default:
            return state;
    }
}

export default reducer