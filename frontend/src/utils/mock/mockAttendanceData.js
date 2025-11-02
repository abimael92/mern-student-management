// ===== ./frontend/src/utils/mock/mockAttendanceData.js =====
export const attendanceRecords = [
    { id: 1, studentId: 'S001', name: 'John Smith', class: 'Grade 5A', status: 'Present', date: '2024-01-15', time: '08:30' },
    { id: 2, studentId: 'S002', name: 'Emma Johnson', class: 'Grade 5A', status: 'Late', date: '2024-01-15', time: '09:15' },
    { id: 3, studentId: 'S003', name: 'Michael Brown', class: 'Grade 5A', status: 'Present', date: '2024-01-15', time: '08:25' },
    { id: 4, studentId: 'S004', name: 'Sarah Davis', class: 'Grade 8B', status: 'Absent', date: '2024-01-15', time: null },
    { id: 5, studentId: 'S005', name: 'David Wilson', class: 'Grade 8B', status: 'Present', date: '2024-01-15', time: '08:45' },
];

export const students = [
    { id: 'S001', name: 'John Smith', class: 'Grade 5A', attendanceStatus: 'Present', weeklyAttendance: 95, monthlyAttendance: 92 },
    { id: 'S002', name: 'Emma Johnson', class: 'Grade 5A', attendanceStatus: 'Late', weeklyAttendance: 88, monthlyAttendance: 85 },
    { id: 'S003', name: 'Michael Brown', class: 'Grade 5A', attendanceStatus: 'Present', weeklyAttendance: 100, monthlyAttendance: 98 },
    { id: 'S004', name: 'Sarah Davis', class: 'Grade 8B', attendanceStatus: 'Absent', weeklyAttendance: 75, monthlyAttendance: 80 },
    { id: 'S005', name: 'David Wilson', class: 'Grade 8B', attendanceStatus: 'Present', weeklyAttendance: 92, monthlyAttendance: 90 },
];