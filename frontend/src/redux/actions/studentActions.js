export const fetchStudents = () => async (dispatch) => {
    try {
        const response = await fetch('/students');
        const data = await response.json();
        dispatch({ type: 'FETCH_STUDENTS', payload: data });
    } catch (error) {
        console.error('Error fetching students:', error);
    }
};

export const addStudent = (studentData) => async (dispatch) => {
    try {
        const response = await fetch('/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData),
        });
        const data = await response.json();
        dispatch({ type: 'ADD_STUDENT', payload: data });
    } catch (error) {
        console.error('Error adding student:', error);
    }
};

export const updateStudent = (id, updatedData) => async (dispatch) => {
    try {
        const response = await fetch(`/students/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        const data = await response.json();
        dispatch({ type: "UPDATE_STUDENT", payload: data });
    } catch (error) {
        console.error("Error updating student:", error);
    }
};
