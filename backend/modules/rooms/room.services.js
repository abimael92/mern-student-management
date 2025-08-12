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