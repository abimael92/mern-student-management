import { api } from '../../utils/api';
import {
    FETCH_GRADES_REQUEST,
    FETCH_GRADES_SUCCESS,
    FETCH_GRADES_FAILURE,
} from '../gradesActionTypes';

export const fetchGrades = () => async (dispatch) => {
    dispatch({ type: FETCH_GRADES_REQUEST });
    try {
        const grades = await api.fetchGrades(); // Assumes this hits `/api/grades`
        dispatch({ type: FETCH_GRADES_SUCCESS, payload: grades });
    } catch (error) {
        dispatch({ type: FETCH_GRADES_FAILURE, error: error.message });
    }
};
