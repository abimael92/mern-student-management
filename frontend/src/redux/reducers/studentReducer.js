// reducers/studentReducer.js
const initialState = {
    students: [],
};

export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_STUDENTS':
            return { ...state, students: action.payload };
        default:
            return state;
    }
};
