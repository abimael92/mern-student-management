import {
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    ADD_STUDENT,
    ADD_STUDENT_FAILURE,
    UPDATE_STUDENT,
    UPDATE_STUDENT_START,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAILURE,
    UPDATE_STUDENT_STATUS,
    UPDATE_STUDENT_STATUS_START,
    UPDATE_STUDENT_STATUS_SUCCESS,
    UPDATE_STUDENT_STATUS_FAILURE,
} from '../actionTypes';

const initialState = {
    students: [],
    isLoading: false,
    error: null,
};

export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENTS_REQUEST:
        case UPDATE_STUDENT_START:
        case UPDATE_STUDENT_STATUS_START:
            return { ...state, isLoading: true, error: null };

        case FETCH_STUDENTS_SUCCESS:
            return { ...state, students: action.payload, isLoading: false, error: null };

        case ADD_STUDENT:
            return { ...state, students: [...state.students, action.payload], error: null };

        case UPDATE_STUDENT_SUCCESS:
        case UPDATE_STUDENT:
            return {
                ...state,
                students: state.students.map((student) =>
                    student._id === action.payload._id ? action.payload : student
                ),
                isLoading: false,
                error: null,
            };

        case UPDATE_STUDENT_STATUS_SUCCESS:
            return {
                ...state,
                students: state.students.map((student) =>
                    student._id === action.payload._id
                        ? { ...student, isEnrolled: action.payload.isEnrolled }
                        : student
                ),
                isLoading: false,
            };

        case UPDATE_STUDENT_STATUS:
            return {
                ...state,
                students: state.students.map((student) =>
                    student._id === action.payload.id
                        ? { ...student, isEnrolled: action.payload.status }
                        : student
                ),
                isLoading: false,
                error: null,
            };

        case FETCH_STUDENTS_FAILURE:
        case ADD_STUDENT_FAILURE:
        case UPDATE_STUDENT_FAILURE:
        case UPDATE_STUDENT_STATUS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
