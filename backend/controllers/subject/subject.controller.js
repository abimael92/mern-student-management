import Subject from '../../models/subject.schema.js';
import { generateSubjectCode } from '../../services/codeGenerator.service.js';

// Create a new subject
export const createSubject = async (req, res) => {
    try {
        const subjectCode = await generateSubjectCode(req.body.name); // Generate the subject code
        const subject = new Subject({ ...req.body, subjectCode }); // Add the generated code to the subject
        await subject.save();
        res.status(201).json(subject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all subjects
export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get one subject by ID
export const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).json({ error: 'Subject not found' });
        res.json(subject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getSubjectWithSemester = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id)
            .populate('semester', 'name academicYear');

        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        res.json(subject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Subject controller
export const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if subject exists
        const existingSubject = await Subject.findById(id);
        if (!existingSubject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        // Proceed with update
        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.json(updatedSubject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const assignSemesterToSubject = async (req, res) => {
    try {
        const { semesterId } = req.body;

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid subject ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(semesterId)) {
            return res.status(400).json({ error: "Invalid semester ID" });
        }

        // Check if semester exists
        const semester = await Semester.findById(semesterId);
        if (!semester) {
            return res.status(404).json({ error: "Semester not found" });
        }

        const subject = await Subject.findByIdAndUpdate(
            req.params.id,
            { semester: semesterId },
            { new: true }
        ).populate('semester', 'name academicYear');

        if (!subject) {
            return res.status(404).json({ error: "Subject not found" });
        }

        res.json(subject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete subject
export const deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) return res.status(404).json({ error: 'Subject not found' });
        res.json({ message: 'Subject deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
