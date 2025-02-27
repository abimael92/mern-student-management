const API_URL = 'http://localhost:5000';  // Your backend API URL

export const api = {
    fetchStudents: async () => {
        try {
            const response = await fetch(`${API_URL}/students`);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch students:", error);
            throw error;  // Re-throw the error for handling in components
        }
    },

    addStudent: async (studentData) => {
        try {
            const response = await fetch(`${API_URL}/students`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Error: ${errorDetails}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error adding student:", error.message || error);
            throw error;
        }
    },

    updateStudent: async (id, studentData) => {
        try {
            const response = await fetch(`${API_URL}/students/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData),
            });
            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Error: ${errorDetails}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error updating student:", error);
            throw error;
        }
    },

    deleteStudent: async (id) => {
        try {
            const response = await fetch(`${API_URL}/students/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Error: ${errorDetails}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error deleting student:", error);
            throw error;
        }
    },
};
