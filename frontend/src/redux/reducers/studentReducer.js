import {
    FETCH_STUDENTS_SUCCESS,
    ADD_STUDENT,
    UPDATE_STUDENT,
    FETCH_STUDENTS_FAILURE,
    ADD_STUDENT_FAILURE,
    UPDATE_STUDENT_FAILURE,
    UPDATE_STUDENT_STATUS,
} from '../actionTypes';

const initialState = {
    students: [],
    isLoading: false,
    error: null,
};

export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENTS_SUCCESS:
            return { ...state, students: action.payload, error: null };
        case ADD_STUDENT:
            return { ...state, students: [...state.students, action.payload], error: null };
        case UPDATE_STUDENT:
            return {
                ...state,
                students: state.students.map((student) =>
                    student._id === action.payload._id ? action.payload : student
                ),
                error: null,
            };
        case UPDATE_STUDENT_STATUS:
            return {
                ...state,
                students: state.students.map((student) =>
                    student._id === action.payload.id
                        ? { ...student, isEnrolled: action.payload.status }
                        : student
                ),
                error: null,
            };
        case FETCH_STUDENTS_FAILURE:
        case ADD_STUDENT_FAILURE:
        case UPDATE_STUDENT_FAILURE:
            return { ...state, error: action.error };
        default:
            return state;
    }
};
