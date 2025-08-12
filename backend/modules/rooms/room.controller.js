import Room from './room.schema.js';
import { generateRoomId } from './room.services.js';

export const createRoom = async (req, res) => {
    try {
        const roomData = {
            ...req.body,
            roomId: req.body.roomId || await generateRoomId(req.body.name),
        };

        const newRoom = await Room.create(roomData);
        res.status(201).json(newRoom);
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
        const { classId, roomId, day, startTime, endTime } = req.body;

        if (!classId || !roomId || !day || !startTime || !endTime) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const classObj = await Class.findById(classId);
        if (!classObj) {
            return res.status(404).json({ error: 'Class not found' });
        }
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

// temporary-location.controller.js
export const addTemporaryLocation = async (req, res) => {
    try {
        const { classId, roomId, day, startTime, endTime, reason, date } = req.body;

        if (!classId || !roomId || !day || !startTime || !endTime || !reason) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const classObj = await Class.findById(classId);

        // Verify the temporary room is available
        const Room = mongoose.model('Room');
        const isAvailable = await Room.checkAvailabilityWithExceptions(
            roomId,
            date ? new Date(date).getDay() : day,
            { start: startTime, end: endTime },
            { ignoreClassId: classId, allowTemporary: true }
        );

        if (!isAvailable) {
            return res.status(400).json({ error: "Temporary room not available" });
        }

        classObj.temporaryLocations.push({
            room: roomId,
            ...(date && { date: new Date(date) }),
            schedule: { day, startTime, endTime, active: true },
            reason
        });

        await classObj.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};