import {
    FETCH_TEACHERS_REQUEST,
    FETCH_TEACHERS_SUCCESS,
    FETCH_TEACHERS_FAILURE,
    ADD_TEACHER,
    ADD_TEACHER_FAILURE,
    UPDATE_TEACHER,
    UPDATE_TEACHER_START,
    UPDATE_TEACHER_SUCCESS,
    UPDATE_TEACHER_FAILURE,
    UPDATE_TEACHER_STATUS,
    UPDATE_TEACHER_STATUS_START,
    UPDATE_TEACHER_STATUS_SUCCESS,
    UPDATE_TEACHER_STATUS_FAILURE,
} from '../teacherActionTypes';

const initialState = {
    teachers: [],
    isLoading: false,
    error: null,
};

export const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TEACHERS_REQUEST:
        case UPDATE_TEACHER_START:
        case UPDATE_TEACHER_STATUS_START:
            return { ...state, isLoading: true, error: null };

        case FETCH_TEACHERS_SUCCESS:
            return { ...state, teachers: action.payload, isLoading: false, error: null };

        case ADD_TEACHER:
            return { ...state, teachers: [...state.teachers, action.payload], error: null };

        case UPDATE_TEACHER_SUCCESS:
        case UPDATE_TEACHER:
            return {
                ...state,
                teachers: state.teachers.map((teacher) =>
                    teacher._id === action.payload._id ? action.payload : teacher
                ),
                isLoading: false,
                error: null,
            };

        case UPDATE_TEACHER_STATUS_SUCCESS:
            return {
                ...state,
                teachers: state.teachers.map((teacher) =>
                    teacher._id === action.payload._id
                        ? { ...teacher, isActive: action.payload.isActive }
                        : teacher
                ),
                isLoading: false,
            };

        case UPDATE_TEACHER_STATUS:
            return {
                ...state,
                teachers: state.teachers.map((teacher) =>
                    teacher._id === action.payload.id
                        ? { ...teacher, isActive: action.payload.status }
                        : teacher
                ),
                isLoading: false,
                error: null,
            };

        case FETCH_TEACHERS_FAILURE:
        case ADD_TEACHER_FAILURE:
        case UPDATE_TEACHER_FAILURE:
        case UPDATE_TEACHER_STATUS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
