import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../redux/actions/studentActions';

const StudentList = () => {
	const dispatch = useDispatch();
	const students = useSelector((state) => state.students);

	useEffect(() => {
		dispatch(fetchStudents());
	}, [dispatch]);

	return (
		<div>
			<h2>Students</h2>
			<ul>
				{students.map((student) => (
					<li key={student._id}>{student.studentName}</li>
				))}
			</ul>
		</div>
	);
};

export default StudentList;
