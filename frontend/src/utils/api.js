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
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    addClass: async (data) => {
        const sanitized = {
            schedule: data.schedule || '',
            course: typeof data.course === 'string' ? data.course : data.course?._id,
            teacher: typeof data.teacher === 'string' ? data.teacher : data.teacher?._id,
            room: typeof data.room === 'string' ? data.room : data.room?._id,
            students: (data.students || []).map(s => typeof s === 'string' ? s : s._id)
        };

        const res = await fetch(`${BASE}/api/classes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sanitized),
        });

        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    updateClass: async (cls) => {
        if (!cls._id) throw new Error('Invalid class ID');
        const res = await fetch(`${BASE}/api/classes/${cls._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cls),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    deleteClass: async (id) => {
        const res = await fetch(`${BASE}/api/classes/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(await res.text());
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
    }


};
