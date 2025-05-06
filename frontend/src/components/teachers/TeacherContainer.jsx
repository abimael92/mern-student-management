import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTeachers,
  updateTeacherStatus,
  deleteTeacher,
  updateTeacher,
} from '../../redux/actions/teacherActions';
import TeacherList from './TeacherList';

const TeacherContainer = () => {
  const dispatch = useDispatch();
  const { teachers, isLoading, error } = useSelector((state) => state.teachers);

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
    dispatch(fetchTeachers());
  }, [dispatch]);

  const filteredStudents =
    teachers?.filter((teacher) => {
      if (Object.values(filters).every((val) => !val)) return true;

      const { name, clan, age, grade, tutor, nationality } = filters;

      const matchesName =
        !name || teacher.firstName?.toLowerCase().includes(name.toLowerCase());
      const matchesClan =
        !clan || teacher.lastName?.toLowerCase().includes(clan.toLowerCase());
      const matchesAge = !age || teacher.age === Number(age);
      const matchesGrade = !grade || teacher.grade === grade;
      const matchesTutor =
        !tutor || teacher.tutor?.toLowerCase().includes(tutor.toLowerCase());
      const matchesNationality =
        !nationality ||
        teacher.nationality?.toLowerCase().includes(nationality.toLowerCase());

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
  const handleEdit = (teacher) => {
    setSelectedStudent(teacher);
    setDialogOpen(true);
  };

  const handleDelete = async (teacherNumber) => {
    try {
      await dispatch(deleteStudent(teacherNumber));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleToggleStatus = async (teacher) => {
    if (!teacher?._id) return;
    try {
      await dispatch(updateTeacherStatus(teacher._id, !teacher.isEnrolled));
    } catch (error) {
      console.error('Status toggle failed:', error);
    }
  };

  const handleUpdateStudent = async (updatedTeacher) => {
    if (!updatedTeacher.teacherNumber) return;
    try {
      await dispatch(updateTeacher(updatedTeacher));
      setDialogOpen(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <TeacherList
      teachers={filteredStudents}
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

export default TeacherContainer;
