// src/redux/reducers/roomsReducer.js

import {
    FETCH_ROOMS_REQUEST,
    FETCH_ROOMS_SUCCESS,
    FETCH_ROOMS_FAILURE,
    ADD_ROOM,
    ADD_ROOM_FAILURE,
    UPDATE_ROOM_START,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_FAILURE,
    DELETE_ROOM,
} from '../roomsActionTypes';

const initialState = {
    loading: false,
    rooms: [],
    error: null,
};

export const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ROOMS_REQUEST:
        case UPDATE_ROOM_START:
            return { ...state, loading: true, error: null };

        case FETCH_ROOMS_SUCCESS:
            return { ...state, loading: false, rooms: action.payload };

        case FETCH_ROOMS_FAILURE:
        case ADD_ROOM_FAILURE:
        case UPDATE_ROOM_FAILURE:
            return { ...state, loading: false, error: action.error };

        case ADD_ROOM:
            return {
                ...state,
                rooms: [...state.rooms, action.payload],
            };

        case UPDATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: state.rooms.map((room) =>
                    room._id === action.payload._id ? action.payload : room
                ),
            };

        case DELETE_ROOM:
            return {
                ...state,
                rooms: state.rooms.filter((room) => room._id !== action.payload),
            };

        default:
            return state;
    }
};

