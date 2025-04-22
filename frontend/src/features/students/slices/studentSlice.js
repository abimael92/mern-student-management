import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStudents as fetchStudentsAPI } from '@api/services/studentService';

// ✅ Renamed to avoid conflict
export const fetchStudentsData = createAsyncThunk(
    'students/fetchStudents',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchStudentsAPI();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const studentSlice = createSlice({
    name: 'students',
    initialState: { list: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudentsData.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchStudentsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default studentSlice.reducer;