import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStudents,
  updateStudentStatus,
  deleteStudent,
  updateStudent,
} from '../../redux/actions/studentActions';
import StudentList from './StudentList';

const StudentContainer = () => {
  const dispatch = useDispatch();
  const { students, isLoading, error } = useSelector((state) => state.students);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    clan: '',
    age: '',
    grade: '',
    tutor: '',
    nationality: '',
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filteredStudents =
    students?.filter((student) => {
      if (Object.values(filters).every((val) => !val)) return true;

      const { name, clan, age, grade, tutor, nationality } = filters;

      const matchesName =
        !name || student.firstName?.toLowerCase().includes(name.toLowerCase());
      const matchesClan =
        !clan || student.lastName?.toLowerCase().includes(clan.toLowerCase());
      const matchesAge = !age || student.age === Number(age);
      const matchesGrade = !grade || student.grade === grade;
      const matchesTutor =
        !tutor || student.tutor?.toLowerCase().includes(tutor.toLowerCase());
      const matchesNationality =
        !nationality ||
        student.nationality?.toLowerCase().includes(nationality.toLowerCase());

      return (
        matchesName &&
        matchesClan &&
        matchesAge &&
        matchesGrade &&
        matchesTutor &&
        matchesNationality
      );
    }) || [];

  // Add these handler functions that were missing
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleDelete = async (studentNumber) => {
    try {
      await dispatch(deleteStudent(studentNumber));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleToggleStatus = async (student) => {
    if (!student?._id) return;
    try {
      await dispatch(updateStudentStatus(student._id, !student.isEnrolled));
    } catch (error) {
      console.error('Status toggle failed:', error);
    }
  };

  const handleUpdateStudent = async (updatedStudent) => {
    if (!updatedStudent.studentNumber) return;
    try {
      await dispatch(updateStudent(updatedStudent));
      setDialogOpen(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <StudentList
      students={filteredStudents}
      isLoading={isLoading}
      error={error}
      onFilter={setFilters}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleStatus={handleToggleStatus}
      dialogOpen={dialogOpen}
      selectedStudent={selectedStudent}
      setDialogOpen={setDialogOpen}
      setSelectedStudent={setSelectedStudent}
      onUpdateStudent={handleUpdateStudent}
    />
  );
};

export default StudentContainer;
