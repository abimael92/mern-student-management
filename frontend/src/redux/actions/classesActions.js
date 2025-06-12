// src/redux/actions/classesActions.js

import { api } from '../../utils/api';
import {
    FETCH_CLASSES_REQUEST,
    FETCH_CLASSES_SUCCESS,
    FETCH_CLASSES_FAILURE,
    ADD_CLASS,
    ADD_CLASS_FAILURE,
    UPDATE_CLASS_START,
    UPDATE_CLASS_SUCCESS,
    UPDATE_CLASS_FAILURE,
    DELETE_CLASS,
} from '../classesActionTypes';

// === FETCH CLASSES ===
export const fetchClasses = () => async (dispatch) => {
    dispatch({ type: FETCH_CLASSES_REQUEST });
    try {
        const classes = await api.fetchClasses();
        dispatch({ type: FETCH_CLASSES_SUCCESS, payload: classes });
    } catch (error) {
        dispatch({ type: FETCH_CLASSES_FAILURE, error: error.message });
    }
};

// === ADD CLASS ===
export const addClass = (classData) => async (dispatch) => {
    try {
        const newClass = await api.addClass(classData);
        dispatch({ type: ADD_CLASS, payload: newClass });
    } catch (error) {
        dispatch({ type: ADD_CLASS_FAILURE, error: error.message });
    }
};

// === UPDATE CLASS ===
export const updateClass = (classData) => async (dispatch) => {
    dispatch({ type: UPDATE_CLASS_START });
    try {
        if (!classData._id) {
            throw new Error('No class ID provided for update');
        }
        const updatedClass = await api.updateClass(classData);
        dispatch({ type: UPDATE_CLASS_SUCCESS, payload: updatedClass });
    } catch (error) {
        dispatch({ type: UPDATE_CLASS_FAILURE, error: error.message });
    }
};

// === DELETE CLASS ===
export const deleteClass = (id) => async (dispatch) => {
    try {
        await api.deleteClass(id);
        dispatch({ type: DELETE_CLASS, payload: id });
    } catch (error) {
        console.error('Error deleting class:', error);
    }
};
