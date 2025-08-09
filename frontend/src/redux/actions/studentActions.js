import { api } from '../../utils/api';
import {
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    ADD_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
    UPDATE_STUDENT_STATUS,
    UPDATE_STUDENT_START,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAILURE,
    UPDATE_STUDENT_STATUS_START,
    UPDATE_STUDENT_STATUS_SUCCESS,
    UPDATE_STUDENT_STATUS_FAILURE,
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

export const addStudent = (studentData) => async (dispatch) => {
    console.log('Redux action payload:', studentData)
    try {
        const response = await api.addStudent(studentData);
        dispatch({ type: ADD_STUDENT, payload: response.data });
        dispatch(fetchStudents()); // Refresh with full updated list
    } catch (error) {
        dispatch({ type: ADD_STUDENT_FAILURE, payload: error.message });
        console.error('Error adding student:', error);
    }

};

export const deleteStudent = (id) => async (dispatch) => {
    console.log('Deleting student with ID:', id);
    try {
        await api.deleteStudent(id);
        dispatch({ type: DELETE_STUDENT, payload: id });
        dispatch(fetchStudents()); // Optional: keep list in sync
    } catch (error) {
        console.error('Error deleting student:', error);
    }
};

export const updateStudentStatus = (studentId, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_STUDENT_STATUS_START });
        const updatedStudent = await api.updateStudentStatus(studentId, status);
        dispatch({ type: UPDATE_STUDENT_STATUS_SUCCESS, payload: updatedStudent });

    } catch (error) {
        dispatch({
            type: UPDATE_STUDENT_STATUS_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

export const updateStudent = (studentData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_STUDENT_START });
        const response = await api.updateStudent(studentData);
        dispatch({ type: UPDATE_STUDENT_SUCCESS, payload: response });
    } catch (error) {
        console.error('Error updating student:', error);
        dispatch({
            type: UPDATE_STUDENT_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};
