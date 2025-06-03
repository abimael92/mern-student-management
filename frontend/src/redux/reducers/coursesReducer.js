import {
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAILURE,
    ADD_COURSE,
    ADD_COURSE_FAILURE,
    UPDATE_COURSE_START,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAILURE,
    DELETE_COURSE,
} from '../coursesActionTypes.js';

const initialState = {
    courses: [],
    loading: false,
    error: null,
};

export const coursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COURSES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_COURSES_SUCCESS:
            return { ...state, loading: false, courses: action.payload };
        case FETCH_COURSES_FAILURE:
            return { ...state, loading: false, error: action.error };

        case ADD_COURSE:
            return { ...state, courses: [...state.courses, action.payload], error: null };
        case ADD_COURSE_FAILURE:
            return { ...state, error: action.error };

        case UPDATE_COURSE_START:
            return { ...state, loading: true, error: null };
        case UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                courses: state.courses.map((course) =>
                    course._id === action.payload._id ? action.payload : course
                ),
            };
        case UPDATE_COURSE_FAILURE:
            return { ...state, loading: false, error: action.error };

        case DELETE_COURSE:
            return {
                ...state,
                courses: state.courses.filter((course) => course._id !== action.payload),
            };

        default:
            return state;
    }
};
