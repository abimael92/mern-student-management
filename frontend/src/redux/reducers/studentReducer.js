import { FETCH_STUDENTS, ADD_STUDENT, UPDATE_STUDENT, FETCH_STUDENTS_FAILURE, ADD_STUDENT_FAILURE, UPDATE_STUDENT_FAILURE } from '../actionTypes';

const initialState = {
    students: [],
    isLoading: false,
    error: null,
};

export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENTS:
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
        case FETCH_STUDENTS_FAILURE:
        case ADD_STUDENT_FAILURE:
        case UPDATE_STUDENT_FAILURE:
            return { ...state, error: action.error };
        default:
            return state;
    }
};
