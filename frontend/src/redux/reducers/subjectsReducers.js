import {
    FETCH_SUBJECTS_REQUEST,
    FETCH_SUBJECTS_SUCCESS,
    FETCH_SUBJECTS_FAILURE,
    ADD_SUBJECT,
    ADD_SUBJECT_FAILURE,
    UPDATE_SUBJECT_START,
    UPDATE_SUBJECT_SUCCESS,
    UPDATE_SUBJECT_FAILURE,
    DELETE_SUBJECT,
} from '../subjectsActionTypes.js';

const initialState = {
    subjects: [],
    loading: false,
    error: null,
};

export const subjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUBJECTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_SUBJECTS_SUCCESS:
            return { ...state, loading: false, subjects: action.payload };
        case FETCH_SUBJECTS_FAILURE:
            return { ...state, loading: false, error: action.error };

        case ADD_SUBJECT:
            return { ...state, subjects: [...state.subjects, action.payload] };
        case ADD_SUBJECT_FAILURE:
            return { ...state, error: action.error };

        case UPDATE_SUBJECT_START:
            return { ...state, loading: true };
        case UPDATE_SUBJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                subjects: state.subjects.map((subject) =>
                    subject._id === action.payload._id ? action.payload : subject
                ),
            };
        case UPDATE_SUBJECT_FAILURE:
            return { ...state, loading: false, error: action.error };

        case DELETE_SUBJECT:
            return {
                ...state,
                subjects: state.subjects.filter((subject) => subject._id !== action.payload),
            };

        default:
            return state;
    }
};

