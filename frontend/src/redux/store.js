import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import { studentReducer } from './reducers/studentReducer';
import { subjectReducer } from './reducers/subjectsReducers';

import { teacherReducer } from './reducers/teacherReducer';

const rootReducer = combineReducers({
    students: studentReducer,
    subjects: subjectReducer,

    teachers: teacherReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
