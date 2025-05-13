const initialState = {
    allGrades: [],  // Ensure the state has an allGrades property initialized
};

export const gradesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GRADES':
            return {
                ...state,
                allGrades: action.payload,
            };
        default:
            return state;
    }
};
