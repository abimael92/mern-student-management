import Class from "../../models/class.schema.js";

// ----- READ -----
export const getClasses = async (req, res) => {
    try {
        const classes = await Class.find()
            .populate("course")
            .populate("teacher")
            .populate("room")
            .populate("students");
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ----- CREATE -----
export const createClass = async (req, res) => {
    try {
        const { schedule, course, teacher, room, students = [] } = req.body;
        if (!schedule || !course || !teacher || !room) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newClass = new Class({ schedule, course, teacher, room, students });
        await newClass.save();
        const populated = await newClass
            .populate("course")
            .populate("teacher")
            .populate("room")
            .populate("students")
            .execPopulate();
        res.status(201).json(populated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ----- UPDATE -----
export const updateClass = async (req, res) => {
    try {
        const updated = await Class.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .populate("course")
            .populate("teacher")
            .populate("room")
            .populate("students");
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ----- DELETE -----
export const deleteClass = async (req, res) => {
    try {
        await Class.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
