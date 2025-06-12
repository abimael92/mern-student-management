// src/redux/actions/roomsActions.js

import { api } from '../../utils/api';
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

// === FETCH ROOMS ===
export const fetchRooms = () => async (dispatch) => {
    dispatch({ type: FETCH_ROOMS_REQUEST });
    try {
        const rooms = await api.fetchRooms();
        dispatch({ type: FETCH_ROOMS_SUCCESS, payload: rooms });
    } catch (error) {
        dispatch({ type: FETCH_ROOMS_FAILURE, error: error.message });
    }
};

// === ADD ROOM ===
export const addRoom = (roomData) => async (dispatch) => {
    try {
        const newRoom = await api.addRoom(roomData);
        dispatch({ type: ADD_ROOM, payload: newRoom });
    } catch (error) {
        dispatch({ type: ADD_ROOM_FAILURE, error: error.message });
    }
};

// === UPDATE ROOM ===
export const updateRoom = (roomData) => async (dispatch) => {
    dispatch({ type: UPDATE_ROOM_START });
    try {
        if (!roomData._id) throw new Error('No room ID provided for update');
        const updatedRoom = await api.updateRoom(roomData);
        dispatch({ type: UPDATE_ROOM_SUCCESS, payload: updatedRoom });
    } catch (error) {
        dispatch({ type: UPDATE_ROOM_FAILURE, error: error.message });
    }
};

// === DELETE ROOM ===
export const deleteRoom = (id) => async (dispatch) => {
    try {
        await api.deleteRoom(id);
        dispatch({ type: DELETE_ROOM, payload: id });
    } catch (error) {
        console.error('Error deleting room:', error);
    }
};
