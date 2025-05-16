export const routes = [
    { id: 1, name: 'Route A', stops: ['Stop 1', 'Stop 2', 'Stop 3'] },
    { id: 2, name: 'Route B', stops: ['Stop 4', 'Stop 5'] },
];

export const vehicles = [
    { id: 1, number: 'AB1234', capacity: 40 },
    { id: 2, number: 'CD5678', capacity: 30 },
];

export const assignments = [
    { driverName: 'John Doe', vehicle: 'AB1234', route: 'Route A' },
    { driverName: 'Jane Smith', vehicle: 'CD5678', route: 'Route B' },
];

export const schedules = [
    { route: 'Route A', time: '08:00 AM' },
    { route: 'Route B', time: '09:00 AM' },
];
