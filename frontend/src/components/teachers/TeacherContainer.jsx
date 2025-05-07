import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTeachers,
  deleteTeacher,
  updateTeacherStatus,
} from '../../redux/actions/teacherActions';
import TeacherList from './TeacherList';

const TeacherContainer = () => {
  const dispatch = useDispatch();
  const { teachers, loading, error } = useSelector((state) => state.teachers);
  const [filter, setFilter] = useState({
    search: '',
    status: 'all',
    subject: '',
  });

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      filter.search === '' ||
      teacher.firstName.toLowerCase().includes(filter.search.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(filter.search.toLowerCase()) ||
      teacher.email.toLowerCase().includes(filter.search.toLowerCase());

    const matchesStatus =
      filter.status === 'all' ||
      (filter.status === 'active' && teacher.isActive) ||
      (filter.status === 'inactive' && !teacher.isActive);

    const matchesSubject =
      filter.subject === '' || teacher.subjects.includes(filter.subject);

    return matchesSearch && matchesStatus && matchesSubject;
  });

  const handleDelete = async (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      await dispatch(deleteTeacher(teacherId));
    }
  };

  const handleStatusChange = async (teacherId, isActive) => {
    await dispatch(updateTeacherStatus(teacherId, !isActive));
  };

  return (
    <TeacherList
      teachers={filteredTeachers}
      loading={loading}
      error={error}
      filter={filter}
      onFilterChange={setFilter}
      onDelete={handleDelete}
      onStatusChange={handleStatusChange}
    />
  );
};

export default TeacherContainer;
