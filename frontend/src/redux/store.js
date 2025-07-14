import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import { studentReducer } from './reducers/studentReducer';
import { subjectReducer } from './reducers/subjectsReducers';
import { coursesReducer } from './reducers/coursesReducer';
import { classesReducer } from "./reducers/classesReducer";
import { roomsReducer } from "./reducers/roomsReducer";
import { teacherReducer } from './reducers/teacherReducer';
import { gradesReducer } from './reducers/gradesReducer';

const rootReducer = combineReducers({
    subjects: subjectReducer,
    courses: coursesReducer,
    classes: classesReducer,
    grades: gradesReducer,
    rooms: roomsReducer,
    teachers: teacherReducer,
    students: studentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
