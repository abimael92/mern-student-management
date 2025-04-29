const BASE = import.meta.env.VITE_API_URL;

export const api = {
    fetchStudents: async () => {
        const res = await fetch(`${BASE}/api/students`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    addStudent: async (data) => {
        console.log(data);

        const res = await fetch(`${BASE}/api/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    updateStudent: async (id, data) => {
        const res = await fetch(`${BASE}/api/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    deleteStudent: async (id) => {
        const res = await fetch(`${BASE}/api/students/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    uploadImage: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch(`${BASE}/api/upload`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            const result = await res.json();
            // console.log('Upload Response: ', result); // Check the result here
            return result?.url; // Ensure you're returning the correct URL
        } catch (error) {
            console.error('Upload failed:', error);
        }

        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        return data.secure_url;  // Assuming the response has the 'secure_url' field for the uploaded image URL
    },

};
