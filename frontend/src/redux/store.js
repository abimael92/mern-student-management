import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import { combineReducers } from 'redux';
import { studentReducer } from './reducers/studentReducer';

const rootReducer = combineReducers({
    students: studentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));  // `thunk` should be passed here

export default store;
