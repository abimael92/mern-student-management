// src/redux/reducers/classesReducer.js

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

const initialState = {
    classes: [],
    loading: false,
    error: null,
};

export const classesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLASSES_REQUEST:
        case UPDATE_CLASS_START:
            return { ...state, loading: true, error: null };

        case FETCH_CLASSES_SUCCESS:
            return { ...state, loading: false, classes: action.payload };

        case FETCH_CLASSES_FAILURE:
        case ADD_CLASS_FAILURE:
        case UPDATE_CLASS_FAILURE:
            return { ...state, loading: false, error: action.error };

        case ADD_CLASS:
            return { ...state, classes: [...state.classes, action.payload] };

        case UPDATE_CLASS_SUCCESS:
            return {
                ...state,
                loading: false,
                classes: state.classes.map((cls) =>
                    cls._id === action.payload._id ? action.payload : cls
                ),
            };

        case DELETE_CLASS:
            return {
                ...state,
                classes: state.classes.filter((cls) => cls._id !== action.payload),
            };

        default:
            return state;
    }
};


