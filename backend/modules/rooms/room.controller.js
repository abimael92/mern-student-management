import Room from './room.schema.js';

export const createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const assignRoomToClass = async (req, res) => {
    try {
        const { classId, roomId } = req.body;
        const classObj = await Class.findById(classId);

        // This will automatically trigger conflict checks
        classObj.room = roomId;
        await classObj.save();

        res.json({ success: true });
    } catch (err) {
        if (err.code === 'ROOM_CONFLICT') {
            const alternatives = await Room.findAvailableRooms({
                day: req.body.day,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                capacity: req.body.capacity
            });
            res.status(409).json({
                error: err.message,
                alternatives
            });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};