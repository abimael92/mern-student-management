import {
    FETCH_GRADES_REQUEST,
    FETCH_GRADES_SUCCESS,
    FETCH_GRADES_FAILURE,
} from '../gradesActionTypes.js';

const initialState = {
    grades: [],
    loading: false,
    error: null,
};

export const gradesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GRADES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_GRADES_SUCCESS:
            return { ...state, loading: false, grades: action.payload };
        case FETCH_GRADES_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};
