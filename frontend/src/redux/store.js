import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import studentReducer from '../features/students/slices/studentSlice';

const store = configureStore({
    reducer: {
        students: studentReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;