import { api } from '../../utils/api';  // adjust path if needed
import {
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    ADD_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
    UPDATE_STUDENT_STATUS,
} from '../actionTypes';


export const fetchStudents = () => async (dispatch) => {
    dispatch({ type: FETCH_STUDENTS_REQUEST });
    try {
        const data = await api.fetchStudents();
        dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error.message });
    }
};

export const addStudent = async (student) => {
    const response = await axios.post('/api/students', student);
    return response.data;
};


export const updateStudent = (id, student) => async (dispatch) => {
    const data = await api.updateStudent(id, student);
    dispatch({ type: UPDATE_STUDENT, payload: data });
};

export const deleteStudent = (id) => async (dispatch) => {
    await api.deleteStudent(id);
    dispatch({ type: DELETE_STUDENT, payload: id });
};

export const updateStudentStatus = (id, isEnrolled) => async (dispatch) => {
    const data = await api.updateStudent(id, { isEnrolled });
    dispatch({ type: UPDATE_STUDENT_STATUS, payload: data });
};
