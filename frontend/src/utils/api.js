const BASE = import.meta.env.VITE_API_URL;

export const api = {
    // === STUDENT CRUD ===
    fetchStudents: async () => {
        const res = await fetch(`${BASE}/api/students`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    addStudent: async (data) => {
        const res = await fetch(`${BASE}/api/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    updateStudent: async (student) => {
        console.log('id: ', student.id);
        const res = await fetch(`${BASE}/api/students/${student.id}`, { // Use studentNumber here
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student.studentData), // Send the updated student data
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    updateStudentStatus: async (studentId, status) => {
        try {
            const response = await fetch(`${BASE}/api/students/${studentId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isEnrolled: status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            return await response.json(); // ✅ important: return parsed response
        } catch (error) {
            console.error('Error updating student status:', error);
            throw error;
        }
    },

    deleteStudent: async (id) => {
        const res = await fetch(`${BASE}/api/students/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // === TEACHER CRUD ===
    fetchTeachers: async () => {
        const res = await fetch(`${BASE}/api/teachers`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    addTeacher: async (data) => {
        const res = await fetch(`${BASE}/api/teachers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    updateTeacher: async (teacher) => {
        const res = await fetch(`${BASE}/api/teachers/${teacher.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...teacher }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    updateTeacherStatus: async (teacherId, isActive) => {
        const res = await fetch(`${BASE}/api/teachers/${teacherId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json(); // Important: return the parsed JSON
    },

    deleteTeacher: async (id) => {
        const res = await fetch(`${BASE}/api/teachers/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // === IMAGE UPLOAD ===
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(`${BASE}/api/upload`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });
        if (!res.ok) throw new Error(await res.text());
        const result = await res.json();
        return result?.url;
    },

    // === ORDER (REORDER STUDENTS) ===
    reorderStudents: async (orderedIds) => {
        const res = await fetch(`${BASE}/api/students/reorder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: orderedIds }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // === VISIBILITY TOGGLE ===
    toggleVisibility: async (id, isVisible) => {
        const res = await fetch(`${BASE}/api/students/${id}/visibility`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visible: isVisible }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // === COMMENTS ===
    addComment: async (studentId, commentText) => {
        const res = await fetch(`${BASE}/api/students/${studentId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: commentText }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    fetchComments: async (studentId) => {
        const res = await fetch(`${BASE}/api/students/${studentId}/comments`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    deleteComment: async (studentId, commentId) => {
        const res = await fetch(`${BASE}/api/students/${studentId}/comments/${commentId}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },


    // === SUBJECT CRUD ===
    fetchSubjects: async () => {
        const res = await fetch(`${BASE}/api/subjects`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    addSubject: async (data) => {

        const { subjectCode, ...rest } = data;

        const sanitized = {
            ...rest,
            department: data.department || null,
        };


        const res = await fetch(`${BASE}/api/subjects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sanitized),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    updateSubject: async (subject) => {

        if (!subject._id) {
            console.log("subject Id: ", subject._id);
            throw new Error('Invalid subject ID format');
        }

        const sanitized = {
            ...subject,
            department: subject.department || null,
        };

        const res = await fetch(`${BASE}/api/subjects/${subject._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sanitized),
        });

        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    deleteSubject: async (id) => {
        const res = await fetch(`${BASE}/api/subjects/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // === COURSE CRUD ===
    fetchCourses: async () => {
        const res = await fetch(`${BASE}/api/courses`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    addCourse: async (data) => {
        const res = await fetch(`${BASE}/api/courses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    updateCourse: async (course) => {
        if (!course._id) throw new Error('Invalid course ID');
        const res = await fetch(`${BASE}/api/courses/${course._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    deleteCourse: async (id) => {
        const res = await fetch(`${BASE}/api/courses/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(await res.text());
        return res.status === 204 ? null : res.json();
    },

    // === SEMESTER CRUD ===
    fetchSemesters: async () => {
        const res = await fetch(`${BASE}/api/semesters`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    addSemester: async (data) => {
        const res = await fetch(`${BASE}/api/semesters`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    updateSemester: async (semester) => {
        if (!semester._id) throw new Error('Invalid semester ID');
        const res = await fetch(`${BASE}/api/semesters/${semester._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(semester),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    deleteSemester: async (id) => {
        const res = await fetch(`${BASE}/api/semesters/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(await res.text());
        return res.status === 204 ? null : res.json();
    },

    // === CLASS CRUD ===
    fetchClasses: async () => {
        const res = await fetch(`${BASE}/api/classes`);
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch classes');
        }
        return res.json();
    },

    addClass: async (data) => {
        const res = await fetch(`${BASE}/api/classes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                createdBy: '000000000000000000000000' // Temporary fake ID
            })
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    updateClass: async (cls) => {
        if (!cls._id) throw new Error('Invalid class ID');

        const sanitized = {
            ...cls,
            course: typeof cls.course === 'string' ? cls.course : cls.course?._id,
            teacher: typeof cls.teacher === 'string' ? cls.teacher : cls.teacher?._id,
            room: typeof cls.room === 'string' ? cls.room : cls.room?._id,
            enrolledStudents: (cls.enrolledStudents || []).map(s => ({
                student: typeof s.student === 'string' ? s.student : s.student?._id,
                status: s.status || 'active'
            })),
            lastModifiedBy: cls.lastModifiedBy // Include who's making the change
        };

        const res = await fetch(`${BASE}/api/classes/${cls._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sanitized),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to update class');
        }
        return res.json();
    },

    deleteClass: async (id) => {
        const res = await fetch(`${BASE}/api/classes/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to delete class');
        }
        return res.status === 204 ? null : res.json();
    },
    // === ROOM CRUD ===
    fetchRooms: async () => {
        const res = await fetch(`${BASE}/api/rooms`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    addRoom: async (data) => {
        const res = await fetch(`${BASE}/api/rooms`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: data.name,
                capacity: Number(data.capacity) || 0
            }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    updateRoom: async (room) => {
        if (!room._id) throw new Error('Invalid room ID');
        const res = await fetch(`${BASE}/api/rooms/${room._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: room.name,
                capacity: Number(room.capacity) || 0
            }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    deleteRoom: async (id) => {
        const res = await fetch(`${BASE}/api/rooms/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error(await res.text());
        return res.status === 204 ? null : res.json();
    },

    // Add relationship management methods
    assignStudentToClass: async (studentId, classId) => {
        const res = await fetch(`${BASE}/api/students/${studentId}/assign`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                targetType: 'classes',
                targetId: classId
            }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    assignTeacherToClass: async (teacherId, classId) => {
        const res = await fetch(`${BASE}/api/teachers/${teacherId}/assign`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                targetType: 'classes',
                targetId: classId
            }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    assignRoomToClass: async (classId, roomId) => {
        const res = await fetch(`${BASE}/api/classes/${classId}/assign-room`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomId }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    assignCourseToClass: async (classId, courseId) => {
        const res = await fetch(`${BASE}/api/classes/${classId}/assign-course`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseId }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    assignSubjectToCourse: async (courseId, subjectId) => {
        const res = await fetch(`${BASE}/api/courses/${courseId}/assign-subject`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subjectId }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    getCourseWithSubjects: async (courseId) => {
        const res = await fetch(`${BASE}/api/courses/${courseId}/with-subjects`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Add these methods to your api.js
    assignSemesterToSubject: async (subjectId, semesterId) => {
        const res = await fetch(`${BASE}/api/subjects/${subjectId}/assign-semester`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ semesterId }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    getSubjectWithSemester: async (subjectId) => {
        const res = await fetch(`${BASE}/api/subjects/${subjectId}/with-semester`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    assignRelationship: async (sourceType, sourceId, targetType, targetId) => {
        const res = await fetch(`${BASE}/api/${sourceType}/${sourceId}/assign`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetType, targetId }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    unassignRelationship: async (sourceType, sourceId, targetType, targetId) => {
        const res = await fetch(`${BASE}/api/${sourceType}/${sourceId}/unassign`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetType, targetId }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },


    /** ==========book======= */
    fetchTextbooks: async () => {
        const response = await fetch(`${BASE}/api/library`);
        const data = await response.json();
        return data;
    },

    // === ATTENDANCE CRUD ===

    // Get attendance by date
    fetchAttendanceByDate: async (date, classId = null, studentId = null) => {
        let url = `${BASE}/api/attendance?date=${date}`;
        if (classId) url += `&classId=${classId}`;
        if (studentId) url += `&studentId=${studentId}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // === CLASS STUDENTS & ALL STUDENTS ===
    getStudentsByClass: async (classId) => {
        const res = await fetch(`${BASE}/api/students/class/${classId}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    getAllActiveStudents: async () => {
        const res = await fetch(`${BASE}/api/students/active`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    getEnrolledStudents: async () => {
        const res = await fetch(`${BASE}/api/students?status=enrolled`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Mark attendance for multiple students
    markAttendance: async (attendanceData) => {
        const res = await fetch(`${BASE}/api/attendance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attendanceData),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Get attendance statistics
    fetchAttendanceStats: async (startDate, endDate, classId = null, studentId = null) => {
        let url = `${BASE}/api/attendance/stats?startDate=${startDate}&endDate=${endDate}`;
        if (classId) url += `&classId=${classId}`;
        if (studentId) url += `&studentId=${studentId}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Get attendance trends
    fetchAttendanceTrends: async (classId = null, days = 30) => {
        let url = `${BASE}/api/attendance/trends?days=${days}`;
        if (classId) url += `&classId=${classId}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Get student attendance history
    fetchStudentAttendanceHistory: async (studentId, limit = 50) => {
        const res = await fetch(`${BASE}/api/attendance/student/${studentId}?limit=${limit}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Update single attendance record
    updateAttendanceRecord: async (attendanceId, data) => {
        const res = await fetch(`${BASE}/api/attendance/${attendanceId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Delete attendance record
    deleteAttendanceRecord: async (attendanceId) => {
        const res = await fetch(`${BASE}/api/attendance/${attendanceId}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Bulk update attendance status
    bulkUpdateAttendance: async (studentIds, date, status, classId, remarks = null) => {
        const res = await fetch(`${BASE}/api/attendance/bulk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentIds,
                date,
                status,
                classId,
                remarks
            }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Get attendance for a specific student in a date range
    fetchStudentAttendanceRange: async (studentId, startDate, endDate) => {
        const res = await fetch(`${BASE}/api/attendance/student/${studentId}/range?startDate=${startDate}&endDate=${endDate}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Get attendance summary for a class
    fetchClassAttendanceSummary: async (classId, startDate, endDate) => {
        const res = await fetch(`${BASE}/api/attendance/class/${classId}/summary?startDate=${startDate}&endDate=${endDate}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Export attendance data
    exportAttendance: async (params) => {
        const queryParams = new URLSearchParams(params).toString();
        const res = await fetch(`${BASE}/api/attendance/export?${queryParams}`, {
            method: 'GET',
        });
        if (!res.ok) throw new Error(await res.text());
        return res.blob();
    },

    // Get attendance calendar data
    fetchAttendanceCalendar: async (month, year, classId = null) => {
        let url = `${BASE}/api/attendance/calendar?month=${month}&year=${year}`;
        if (classId) url += `&classId=${classId}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Mark student attendance (single student)
    markStudentAttendance: async (studentId, data) => {
        const res = await fetch(`${BASE}/api/attendance/student/${studentId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Get todays attendance for a class
    fetchTodaysClassAttendance: async (classId) => {
        const res = await fetch(`${BASE}/api/attendance/today/${classId}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Get attendance overview (dashboard)
    fetchAttendanceOverview: async () => {
        const res = await fetch(`${BASE}/api/attendance/overview`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Get absent students for today
    fetchAbsentToday: async (classId = null) => {
        let url = `${BASE}/api/attendance/absent-today`;
        if (classId) url += `?classId=${classId}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Get late students for today
    fetchLateToday: async (classId = null) => {
        let url = `${BASE}/api/attendance/late-today`;
        if (classId) url += `?classId=${classId}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Excuse student absence
    excuseStudentAbsence: async (attendanceId, excuseNote) => {
        const res = await fetch(`${BASE}/api/attendance/${attendanceId}/excuse`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ excuseNote, isExcused: true }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Unexcuse student absence
    unexcuseStudentAbsence: async (attendanceId) => {
        const res = await fetch(`${BASE}/api/attendance/${attendanceId}/excuse`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isExcused: false }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Add remarks to attendance
    addAttendanceRemarks: async (attendanceId, remarks) => {
        const res = await fetch(`${BASE}/api/attendance/${attendanceId}/remarks`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ remarks }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Get attendance by student and month
    fetchAttendanceByStudentMonth: async (studentId, month, year) => {
        const res = await fetch(`${BASE}/api/attendance/student/${studentId}/month/${year}/${month}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Get attendance by class and month
    fetchAttendanceByClassMonth: async (classId, month, year) => {
        const res = await fetch(`${BASE}/api/attendance/class/${classId}/month/${year}/${month}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Generate attendance report
    generateAttendanceReport: async (reportData) => {
        const res = await fetch(`${BASE}/api/attendance/report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reportData),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    // Check attendance status for a student on a specific date
    checkStudentAttendanceStatus: async (studentId, date) => {
        const res = await fetch(`${BASE}/api/attendance/check/${studentId}/${date}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
};