import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import { studentReducer } from './reducers/studentReducer';
import { subjectReducer } from './reducers/subjectsReducers';
import { coursesReducer } from './reducers/coursesReducer';


import { teacherReducer } from './reducers/teacherReducer';

import { gradesReducer } from './reducers/gradesReducer';

const rootReducer = combineReducers({
    subjects: subjectReducer,
    courses: coursesReducer,
    grades: gradesReducer,

    teachers: teacherReducer,
    students: studentReducer,


});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
