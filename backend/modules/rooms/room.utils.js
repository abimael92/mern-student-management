export const detectConflicts = async (roomId, schedule) => {
    if (!schedule?.day || !schedule?.startTime || !schedule?.endTime) {
        return false; // or throw error
    }

    const room = await Room.findById(roomId);
    if (!room?.currentOccupancy) return false;

    return room.currentOccupancy.some(booking =>
        booking?.schedule?.day === schedule.day &&
        booking?.schedule?.active &&
        (
            (booking.schedule.startTime < schedule.endTime &&
                booking.schedule.startTime >= schedule.startTime) ||
            (booking.schedule.endTime > schedule.startTime &&
                booking.schedule.endTime <= schedule.endTime)
        )
    );
};