import { api } from '../../utils/api';

import {
    FETCH_SEMESTERS_REQUEST,
    FETCH_SEMESTERS_SUCCESS,
    FETCH_SEMESTERS_FAILURE,
    ADD_SEMESTER,
    ADD_SEMESTER_FAILURE,
    UPDATE_SEMESTER,
    DELETE_SEMESTER,
} from '../semesterActionTypes';

export const fetchSemesters = () => async (dispatch) => {
    dispatch({ type: FETCH_SEMESTERS_REQUEST });
    try {
        const data = await api.fetchSemesters();
        dispatch({ type: FETCH_SEMESTERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_SEMESTERS_FAILURE, payload: error.message });
    }
};

export const addSemester = (semesterData) => async (dispatch) => {
    try {
        const response = await api.addSemester(semesterData);
        dispatch({ type: ADD_SEMESTER, payload: response.data });
        dispatch(fetchSemesters());
    } catch (error) {
        dispatch({ type: ADD_SEMESTER_FAILURE, payload: error.message });
        console.error('Error adding semester:', error);
    }
};

export const deleteSemester = (id) => async (dispatch) => {
    try {
        await api.deleteSemester(id);
        dispatch({ type: DELETE_SEMESTER, payload: id });
        dispatch(fetchSemesters());
    } catch (error) {
        console.error('Error deleting semester:', error);
    }
};

export const updateSemester = (semesterData) => async (dispatch) => {
    try {
        const response = await api.updateSemester(semesterData);
        dispatch({ type: UPDATE_SEMESTER, payload: response.data });
        dispatch(fetchSemesters());
    } catch (error) {
        console.error('Error updating semester:', error);
    }
};
