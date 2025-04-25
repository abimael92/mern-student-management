import {
    FETCH_STUDENTS,
    FETCH_STUDENTS_FAILURE,
    ADD_STUDENT,
    ADD_STUDENT_FAILURE,
    UPDATE_STUDENT,
    UPDATE_STUDENT_FAILURE,
    DELETE_STUDENT,
    DELETE_STUDENT_FAILURE,
    UPDATE_STUDENT_STATUS,
    UPDATE_STUDENT_STATUS_FAILURE
} from '../actionTypes';

const API_URL = 'http://localhost:5000';

export const fetchStudents = () => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/students`);
        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        dispatch({ type: FETCH_STUDENTS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_STUDENTS_FAILURE, error: error.message });
    }
};

export const addStudent = (studentData) => async (dispatch) => {

    try {
        const response = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData),
        });

        if (!response.ok) {
            const errorDetails = await response.text();  // If not ok, get the error details
            throw new Error(`Error: ${errorDetails}`);
        }

        const data = await response.json();
        console.log('Added Student Data:', data);
        dispatch({ type: ADD_STUDENT, payload: data.student });

        return data;

    } catch (error) {
        dispatch({ type: ADD_STUDENT_FAILURE, error: error.message });
        throw error;
    }

};

export const updateStudent = (id, updatedData) => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error('Failed to update student');
        }
        const data = await response.json();
        dispatch({ type: UPDATE_STUDENT, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_STUDENT_FAILURE, error: error.message });
    }
};

export const getLastStudentNumber = () => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/students/lastStudentNumber`);

        const data = await response.json();

        dispatch({
            type: 'GET_LAST_STUDENT_NUMBER_SUCCESS',
            payload: data,
        });

        return data;
    } catch (error) {
        dispatch({
            type: 'GET_LAST_STUDENT_NUMBER_FAILURE',
            payload: error.message,
        });
        throw error;
    }
};

export const deleteStudent = (id) => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete student');
        }

        dispatch({ type: DELETE_STUDENT, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_STUDENT_FAILURE, error: error.message });
    }
};


export const updateStudentStatus = (id, status) => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/students/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            throw new Error('Failed to update student status');
        }

        const data = await response.json();
        dispatch({ type: UPDATE_STUDENT_STATUS, payload: { id, status: data.status } });
    } catch (error) {
        dispatch({ type: UPDATE_STUDENT_STATUS_FAILURE, error: error.message });
    }
};

