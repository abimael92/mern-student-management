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



    fetchTextbooks: async () => {
        const response = await fetch(`${BASE}/api/library`);
        const data = await response.json();
        return data;
    }


};
