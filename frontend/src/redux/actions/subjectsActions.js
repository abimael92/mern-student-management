import { api } from '../api'; // Assuming you have an api file for API calls
import {
    FETCH_SUBJECTS,
    FETCH_SUBJECTS_REQUEST,
    FETCH_SUBJECTS_SUCCESS,
    FETCH_SUBJECTS_FAILURE,
    ADD_SUBJECT,
    ADD_SUBJECT_FAILURE,
    UPDATE_SUBJECT,
    UPDATE_SUBJECT_START,
    UPDATE_SUBJECT_SUCCESS,
    UPDATE_SUBJECT_FAILURE,
    DELETE_SUBJECT,
} from './actionTypes';

// === FETCH SUBJECTS ===
export const fetchSubjects = () => async (dispatch) => {
    dispatch({ type: FETCH_SUBJECTS_REQUEST });
    try {
        const subjects = await api.fetchSubjects();  // api.fetchSubjects() should be defined
        dispatch({ type: FETCH_SUBJECTS_SUCCESS, payload: subjects });
    } catch (error) {
        dispatch({ type: FETCH_SUBJECTS_FAILURE, error: error.message });
    }
};

// === ADD SUBJECT ===
export const addSubject = (subjectData) => async (dispatch) => {
    try {
        const newSubject = await api.addSubject(subjectData);
        dispatch({ type: ADD_SUBJECT, payload: newSubject });
    } catch (error) {
        dispatch({ type: ADD_SUBJECT_FAILURE, error: error.message });
    }
};

// === UPDATE SUBJECT ===
export const updateSubject = (subjectData) => async (dispatch) => {
    dispatch({ type: UPDATE_SUBJECT_START });
    try {
        const updatedSubject = await api.updateSubject(subjectData);
        dispatch({ type: UPDATE_SUBJECT_SUCCESS, payload: updatedSubject });
    } catch (error) {
        dispatch({ type: UPDATE_SUBJECT_FAILURE, error: error.message });
    }
};

// === DELETE SUBJECT ===
export const deleteSubject = (id) => async (dispatch) => {
    try {
        await api.deleteSubject(id);  // Assuming deleteSubject is implemented in api
        dispatch({ type: DELETE_SUBJECT, payload: id });
    } catch (error) {
        console.error('Error deleting subject:', error);
    }
};
