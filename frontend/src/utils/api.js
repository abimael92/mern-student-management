export const api = {
    fetchStudents: async () => {
        const response = await fetch('/students');
        return await response.json();
    },

    addStudent: async (studentData) => {
        const response = await fetch('/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData),
        });
        return await response.json();
    },

    updateStudent: async (id, studentData) => {
        const response = await fetch(`/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData),
        });
        return await response.json();
    },

    deleteStudent: async (id) => {
        const response = await fetch(`/students/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    },
};
