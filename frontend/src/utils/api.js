export const api = {
    fetchStudents: async () => {
        try {
            const response = await fetch('/api/students');
            console.log('this is hte response: ', response);
            if (!response.ok) {
                const errorData = await response.text(); // Log full response
                throw new Error(`HTTP error! status: ${response.status}, Response: ${errorData}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fetch students error:", error);
            throw error;
        }
    },


    addStudent: async (studentData) => {
        try {
            const response = await fetch('/api/students', {  // Use '/api' prefix as per Vite proxy config
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
            const response = await fetch(`/api/students/${id}`, {  // Use '/api' prefix as per Vite proxy config
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
            const response = await fetch(`/api/students/${id}`, {  // Use '/api' prefix as per Vite proxy config
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
