import Room from './room.schema.js';

export const generateRoomId = async () => {
    try {
        // Find the room with the highest number
        const lastRoom = await Room.findOne({
            roomId: { $regex: /^Room\d{2}$/ }
        })
            .sort({ roomId: -1 })
            .limit(1);

        if (!lastRoom) {
            return 'Room01';  // First room
        }

        // Extract the number part and increment
        const lastNumber = parseInt(lastRoom.roomId.replace('Room', ''), 10);
        const newNumber = (lastNumber + 1).toString().padStart(2, '0');

        return `Room${newNumber}`;
    } catch (error) {
        console.error('Error generating room ID:', error);
        throw new Error('Failed to generate room ID');
    }
};

export const checkRoomAvailability = async (roomId, timeSlot) => {

    if (!timeSlot || !timeSlot.day || !timeSlot.startTime || !timeSlot.endTime) {
        throw new Error('Invalid timeSlot provided');
    }

    return Room.findOne({
        _id: roomId,
        $nor: [{
            currentOccupancy: {
                $elemMatch: {
                    'schedule.day': timeSlot.day,
                    'schedule.active': true,
                    $or: [
                        { 'schedule.startTime': { $lt: timeSlot.endTime, $gte: timeSlot.startTime } },
                        { 'schedule.endTime': { $gt: timeSlot.startTime, $lte: timeSlot.endTime } }
                    ]
                }
            }
        }]
    });
};