import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsData } from '../students/slices/studentSlice'; // Use the new name

export const useStudents = () => {
    const dispatch = useDispatch();
    const { list: students, loading, error } = useSelector((state) => state.students);

    useEffect(() => {
        dispatch(fetchStudentsData());
    }, [dispatch]);

    return {
        students,
        loading,
        error,
        refreshStudents: () => dispatch(fetchStudentsData()), // Updated here
    };
};