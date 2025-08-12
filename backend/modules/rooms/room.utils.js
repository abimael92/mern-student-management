export const checkRoomAvailability = async (roomId, periodId, day, timeRange) => {
    const Room = mongoose.model('Room');
    const existingBookings = await Room.getAvailability(roomId, periodId);

    return !existingBookings.some(booking =>
        booking.day === day &&
        booking.startTime < timeRange.endTime &&
        booking.endTime > timeRange.startTime
    );
};

export const findAlternativeRooms = async (requirements) => {
    const Room = mongoose.model('Room');
    return await Room.findAvailableRooms(requirements);
};