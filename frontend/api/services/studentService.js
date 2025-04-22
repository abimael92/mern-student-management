import axios from '../ axiosConfig';
import { studentEndpoints } from '../endpoints/studentEndpoints';

export const fetchStudents = () => axios.get(studentEndpoints.getAll);
export const fetchStudentById = (id) => axios.get(studentEndpoints.getById(id));
export const createStudent = (data) => axios.post(studentEndpoints.create, data);
export const updateStudent = (id, data) => axios.put(studentEndpoints.update(id), data);
export const deleteStudent = (id) => axios.delete(studentEndpoints.delete(id));