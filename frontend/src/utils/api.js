const BASE = import.meta.env.VITE_API_URL;

export const api = {
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
};
