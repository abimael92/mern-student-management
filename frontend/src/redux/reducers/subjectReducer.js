import {
    FETCH_SEMESTERS_REQUEST,
    FETCH_SEMESTERS_SUCCESS,
    FETCH_SEMESTERS_FAILURE,
    ADD_SEMESTER,
    ADD_SEMESTER_FAILURE,
    UPDATE_SEMESTER_START,
    UPDATE_SEMESTER_SUCCESS,
    UPDATE_SEMESTER_FAILURE,
    DELETE_SEMESTER,
} from '../semestersActionTypes.js';

const initialState = {
    semesters: [],
    loading: false,
    error: null,
};

export const semesterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SEMESTERS_REQUEST:
            return { ...state, loading: true };
        case FETCH_SEMESTERS_SUCCESS:
            return { ...state, loading: false, semesters: action.payload };
        case FETCH_SEMESTERS_FAILURE:
            return { ...state, loading: false, error: action.error };

        case ADD_SEMESTER:
            return { ...state, semesters: [...state.semesters, action.payload] };
        case ADD_SEMESTER_FAILURE:
            return { ...state, error: action.error };

        case UPDATE_SEMESTER_START:
            return { ...state, loading: true };
        case UPDATE_SEMESTER_SUCCESS:
            return {
                ...state,
                loading: false,
                semesters: state.semesters.map((semester) =>
                    semester._id === action.payload._id ? action.payload : semester
                ),
            };
        case UPDATE_SEMESTER_FAILURE:
            return { ...state, loading: false, error: action.error };

        case DELETE_SEMESTER:
            return {
                ...state,
                semesters: state.semesters.filter((semester) => semester._id !== action.payload),
            };

        default:
            return state;
    }
};
