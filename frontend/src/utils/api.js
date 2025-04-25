// Remove the hardcoded API_URL since we're using Vite proxy
export const api = {
    fetchStudents: async () => {
        try {
            const response = await fetch('/students');  // Removed API_URL prefix
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fetch students error:", error);
            throw error;
        }
    },

    addStudent: async (studentData) => {
        try {
            const response = await fetch('/students', {  // Removed API_URL prefix
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(studentData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Add student error:", error);
            throw error;
        }
    },

    updateStudent: async (id, studentData) => {
        try {
            const response = await fetch(`/students/${id}`, {  // Removed API_URL prefix
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(studentData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Update student error:", error);
            throw error;
        }
    },

    deleteStudent: async (id) => {
        try {
            const response = await fetch(`/students/${id}`, {  // Removed API_URL prefix
                method: 'DELETE',
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Delete student error:", error);
            throw error;
        }
    },
};