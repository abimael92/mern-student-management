import { api } from '../../utils/api';
import {
    FETCH_TEACHERS_REQUEST,
    FETCH_TEACHERS_SUCCESS,
    FETCH_TEACHERS_FAILURE,
    ADD_TEACHER,
    ADD_TEACHER_FAILURE,
    UPDATE_TEACHER,
    DELETE_TEACHER,
    UPDATE_TEACHER_STATUS,
    UPDATE_TEACHER_START,
    UPDATE_TEACHER_SUCCESS,
    UPDATE_TEACHER_FAILURE,
    UPDATE_TEACHER_STATUS_START,
    UPDATE_TEACHER_STATUS_SUCCESS,
    UPDATE_TEACHER_STATUS_FAILURE,
} from '../teacherActionTypes';

export const fetchTeachers = () => async (dispatch) => {
    dispatch({ type: FETCH_TEACHERS_REQUEST });
    try {
        const data = await api.fetchTeachers();
        dispatch({ type: FETCH_TEACHERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_TEACHERS_FAILURE, payload: error.message });
    }
};

export const addTeacher = (teacherData) => async (dispatch) => {
    try {
        const response = await api.addTeacher(teacherData);
        dispatch({ type: ADD_TEACHER, payload: response.data });
        dispatch(fetchTeachers());
    } catch (error) {
        dispatch({ type: ADD_TEACHER_FAILURE, payload: error.message });
        console.error('Error adding teacher:', error);
    }
};

export const deleteTeacher = (id) => async (dispatch) => {
    try {
        await api.deleteTeacher(id);
        dispatch({ type: DELETE_TEACHER, payload: id });
        dispatch(fetchTeachers());
    } catch (error) {
        console.error('Error deleting teacher:', error);
    }
};

export const updateTeacherStatus = (teacherId, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TEACHER_STATUS_START });
        const updatedTeacher = await api.updateTeacherStatus(teacherId, status);
        dispatch({ type: UPDATE_TEACHER_STATUS_SUCCESS, payload: updatedTeacher });
    } catch (error) {
        dispatch({
            type: UPDATE_TEACHER_STATUS_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

export const updateTeacher = (teacherData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TEACHER_START });
        const response = await api.updateTeacher(teacherData);
        dispatch({ type: UPDATE_TEACHER_SUCCESS, payload: response });
    } catch (error) {
        console.error('Error updating teacher:', error);
        dispatch({
            type: UPDATE_TEACHER_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};
