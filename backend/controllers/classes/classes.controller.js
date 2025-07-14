import Class from "../../models/class.schema.js";
import mongoose from "mongoose";

export const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find()
            .populate('course', 'name')
            .populate('teacher', 'firstName lastName')
            .populate('room', 'name');

        console.log("Sample class data:", JSON.stringify(classes[0], null, 2));
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createClass = async (req, res) => {
    try {
        const newClass = await Class.create(req.body);
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedClass) return res.status(404).json({ error: "Class not found" });
        res.json(updatedClass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) return res.status(404).json({ error: "Class not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};