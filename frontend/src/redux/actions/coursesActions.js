import { api } from '../../utils/api';
import {
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAILURE,
    ADD_COURSE,
    ADD_COURSE_FAILURE,
    UPDATE_COURSE_START,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAILURE,
    DELETE_COURSE,
} from './../coursesActionTypes';

// === FETCH COURSES ===
export const fetchCourses = () => async (dispatch) => {
    dispatch({ type: FETCH_COURSES_REQUEST });
    try {
        const courses = await api.fetchCourses();
        dispatch({ type: FETCH_COURSES_SUCCESS, payload: courses });
    } catch (error) {
        dispatch({ type: FETCH_COURSES_FAILURE, error: error.message });
    }
};

// === ADD COURSE ===
export const addCourse = (courseData) => async (dispatch) => {
    try {
        const newCourse = await api.addCourse(courseData);
        dispatch({ type: ADD_COURSE, payload: newCourse });
    } catch (error) {
        dispatch({ type: ADD_COURSE_FAILURE, error: error.message });
    }
};

// === UPDATE COURSE ===
export const updateCourse = (courseData) => async (dispatch) => {
    dispatch({ type: UPDATE_COURSE_START });
    try {
        if (!courseData._id) {
            throw new Error('No course ID provided for update');
        }
        const updatedCourse = await api.updateCourse(courseData);
        dispatch({ type: UPDATE_COURSE_SUCCESS, payload: updatedCourse });
    } catch (error) {
        dispatch({ type: UPDATE_COURSE_FAILURE, error: error.message });
    }
};

// === DELETE COURSE ===
export const deleteCourse = (id) => async (dispatch) => {
    try {
        await api.deleteCourse(id);
        dispatch({ type: DELETE_COURSE, payload: id });
    } catch (error) {
        console.error('Error deleting course:', error);
    }
};
